import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { loadUsers, saveUsers, sessions } from '../storage.js';

const router = express.Router();

function getSessionUser(req) {
  const token = req.cookies.session;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  const users = loadUsers();
  return users.find((u) => u.id === session.userId) || null;
}

function requireAuth(req, res, next) {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = user;
  next();
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

    const users = loadUsers();
    const existing = users.find((u) => u.username === normalizedUsername);
    if (existing) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      username: normalizedUsername,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    saveUsers(users);

    const token = uuidv4();
    sessions.set(token, { userId: user.id, createdAt: Date.now() });

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: { id: user.id, username: user.username, createdAt: user.createdAt },
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
    const users = loadUsers();
    const user = users.find((u) => u.username === normalizedUsername);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = uuidv4();
    sessions.set(token, { userId: user.id, createdAt: Date.now() });

    res.cookie('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { id: user.id, username: user.username, createdAt: user.createdAt },
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
  res.clearCookie('session');
  res.json({ success: true });
});

router.get('/check-username', (req, res) => {
  const { username } = req.query;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  const normalizedUsername = username.toLowerCase().trim();
  const users = loadUsers();
  const exists = users.some((u) => u.username === normalizedUsername);

  res.json({ available: !exists });
});

router.get('/me', (req, res) => {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: { id: user.id, username: user.username, createdAt: user.createdAt } });
});

export default router;
