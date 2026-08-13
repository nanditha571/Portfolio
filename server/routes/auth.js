import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {
  findUserByUsername,
  createUser,
  findUserById,
  sessions,
} from '../storage.js';

const router = express.Router();

async function getSessionUser(req) {
  const token = req.cookies.session;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  return findUserById(session.userId);
}

function requireAuth(req, res, next) {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = user;
  next();
}

function toUserResponse(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    createdAt: user.created_at,
  };
}

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    const invalidChars = /[^a-z0-9_-]/;
    if (invalidChars.test(normalizedUsername)) {
      return res.status(400).json({ error: 'Username can only contain letters, numbers, hyphens, and underscores' });
    }
    if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
      return res.status(400).json({ error: 'Username must be between 3 and 30 characters' });
    }

    const existing = await findUserByUsername(normalizedUsername);
    if (existing) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const createdAt = new Date().toISOString();

    const user = await createUser({
      id: userId,
      username: normalizedUsername,
      email: `${normalizedUsername}@example.com`,
      password: hashedPassword,
      createdAt,
    });

    const token = uuidv4();
    sessions.set(token, { userId: user.id, createdAt: Date.now() });

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: toUserResponse(user),
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    const user = await findUserByUsername(normalizedUsername);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = uuidv4();
    sessions.set(token, { userId: user.id, createdAt: Date.now() });

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: toUserResponse(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  const token = req.cookies.session;
  if (token) {
    sessions.delete(token);
  }
  res.clearCookie('session', {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ success: true });
});

router.get('/check-username', async (req, res) => {
  const { username } = req.query;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  const normalizedUsername = username.toLowerCase().trim();
  const existing = await findUserByUsername(normalizedUsername);

  res.json({ available: !existing });
});

router.get('/me', async (req, res) => {
  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: toUserResponse(user) });
});

export default router;
