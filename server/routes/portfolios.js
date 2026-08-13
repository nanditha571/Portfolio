import express from 'express';
import {
  findUserById,
  findPortfolioByUsername,
  upsertPortfolio,
  setPortfolioPublished,
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

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const portfolio = await findPortfolioByUsername(username);

  if (!portfolio || portfolio.published === false) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.json({ portfolio });
});

router.put('/:username', async (req, res) => {
  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { username } = req.params;
  if (user.username !== username) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const portfolioData = req.body;
  if (!portfolioData || typeof portfolioData !== 'object') {
    return res.status(400).json({ error: 'Invalid portfolio data' });
  }

  const saved = await upsertPortfolio({
    ...portfolioData,
    username,
    userId: user.id,
    published: true,
  });

  res.json({ success: true, url: `/p/${username.toLowerCase()}` });
});

router.post('/publish', async (req, res) => {
  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const portfolioData = req.body;
  if (!portfolioData || typeof portfolioData !== 'object') {
    return res.status(400).json({ error: 'Invalid portfolio data' });
  }

  const slug = user.username.toLowerCase();
  const saved = await upsertPortfolio({
    ...portfolioData,
    username: slug,
    userId: user.id,
    published: true,
  });

  res.json({ success: true, url: `/p/${slug}` });
});

router.post('/unpublish', async (req, res) => {
  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const slug = user.username.toLowerCase();
  const existing = await findPortfolioByUsername(slug);

  if (!existing) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const saved = await setPortfolioPublished(slug, false);

  res.json({ success: true, url: `/p/${slug}` });
});

export default router;
