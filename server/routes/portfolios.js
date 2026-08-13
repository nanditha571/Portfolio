import express from 'express';
import { loadPortfolios, savePortfolios, loadUsers, sessions } from '../storage.js';

const router = express.Router();

function getSessionUser(req) {
  const token = req.cookies.session;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  const users = loadUsers();
  return users.find((u) => u.id === session.userId) || null;
}

router.get('/:username', (req, res) => {
  const { username } = req.params;
  const portfolios = loadPortfolios();
  const portfolio = portfolios[username.toLowerCase()];

  if (!portfolio || portfolio.published === false) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.json({ portfolio });
});

router.put('/:username', (req, res) => {
  const user = getSessionUser(req);
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

  const portfolios = loadPortfolios();
  portfolios[username.toLowerCase()] = {
    ...portfolioData,
    username: username.toLowerCase(),
    publishedAt: new Date().toISOString(),
  };
  savePortfolios(portfolios);

  res.json({ success: true, url: `/p/${username.toLowerCase()}` });
});

router.post('/publish', (req, res) => {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const portfolioData = req.body;
  if (!portfolioData || typeof portfolioData !== 'object') {
    return res.status(400).json({ error: 'Invalid portfolio data' });
  }

  const portfolios = loadPortfolios();
  const slug = user.username.toLowerCase();

  portfolios[slug] = {
    ...portfolioData,
    username: slug,
    publishedAt: new Date().toISOString(),
    published: true,
  };
  savePortfolios(portfolios);

  res.json({ success: true, url: `/p/${slug}` });
});

router.post('/unpublish', (req, res) => {
  const user = getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const portfolios = loadPortfolios();
  const slug = user.username.toLowerCase();
  const existing = portfolios[slug];

  if (!existing) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  portfolios[slug] = {
    ...existing,
    published: false,
    unpublishedAt: new Date().toISOString(),
  };
  savePortfolios(portfolios);

  res.json({ success: true, url: `/p/${slug}` });
});

export default router;
