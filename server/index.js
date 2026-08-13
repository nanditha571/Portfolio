import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolios.js';
import { loadUsers, saveUsers, loadPortfolios, savePortfolios, sessions } from './storage.js';

const app = express();
const PORT = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV !== 'production';

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (isDevelopment) {
      if (origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }

    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
    if (origin === vercelUrl || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('/p/:slug', (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const portfolios = loadPortfolios();
  const portfolio = portfolios[slug];

  if (!portfolio || portfolio.published === false) {
    return res.status(404).send('Portfolio not found');
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
