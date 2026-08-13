import type { Portfolio } from '@/types/portfolio';

const STORAGE_KEY = 'folioforge_portfolio';

export const samplePortfolio: Portfolio = {
  username: 'alexchen',
  personal: {
    firstName: 'Alex',
    lastName: 'Chen',
    role: 'Full Stack Engineer',
    avatar: '',
    location: 'San Francisco, CA',
  },
  about: {
    bio: 'I build accessible, pixel-perfect, and performant web applications. Passionate about developer experience and open source.',
    tagline: 'Full stack. Engineer.',
  },
  skills: [
    { id: '1', name: 'React', level: 92, category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 88, category: 'Frontend' },
    { id: '3', name: 'Node.js', level: 85, category: 'Backend' },
    { id: '4', name: 'Python', level: 78, category: 'Backend' },
    { id: '5', name: 'PostgreSQL', level: 82, category: 'Database' },
    { id: '6', name: 'AWS', level: 75, category: 'DevOps' },
  ],
  projects: [
    {
      id: '1',
      title: 'Neural Canvas',
      description: 'Real-time collaborative whiteboard with AI-assisted drawing and infinite canvas.',
      image: '',
      stack: ['React', 'WebSocket', 'Canvas API'],
      repoUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: true,
    },
    {
      id: '2',
      title: 'FlowState',
      description: 'Developer productivity dashboard with time tracking, focus modes, and analytics.',
      image: '',
      stack: ['Next.js', 'Prisma', 'Tailwind'],
      repoUrl: 'https://github.com',
      featured: false,
    },
    {
      id: '3',
      title: 'DevPulse',
      description: 'CI/CD pipeline visualizer with real-time status updates and failure analysis.',
      image: '',
      stack: ['Vue', 'D3.js', 'GraphQL'],
      repoUrl: 'https://github.com',
      featured: false,
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp',
      role: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '',
      description: 'Led frontend architecture for flagship SaaS product. Improved performance by 40%.',
      current: true,
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2022-02',
      description: 'Built core product features from 0 to 1. Managed team of 3 junior developers.',
      current: false,
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      description: 'Focus on Human-Computer Interaction and Distributed Systems.',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01',
      url: 'https://aws.amazon.com',
    },
  ],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    email: 'alex@example.com',
    website: 'https://alexchen.dev',
  },
  resume: {
    url: '',
    fileName: 'Alex_Chen_Resume.pdf',
  },
  theme: 'neon-circuit',
  updatedAt: new Date().toISOString(),
};

export function loadPortfolio(): Portfolio | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return normalizePortfolio(parsed) as Portfolio;
  } catch {
    return null;
  }
}

export function savePortfolio(data: Portfolio): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
  } catch {
    // ignore storage errors
  }
}

export function clearPortfolio(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function normalizePortfolio(portfolio: unknown): Portfolio {
  if (!portfolio || typeof portfolio !== 'object') {
    return samplePortfolio;
  }

  const p = portfolio as Record<string, unknown>;

  const source = p.data && typeof p.data === 'object' ? (p.data as Record<string, unknown>) : p;

  return {
    ...samplePortfolio,
    ...source,
    personal: source.personal && typeof source.personal === 'object' ? (source.personal as Record<string, unknown>) : samplePortfolio.personal,
    about: source.about && typeof source.about === 'object' ? (source.about as Record<string, unknown>) : samplePortfolio.about,
    skills: Array.isArray(source.skills) ? (source.skills as unknown[]) : samplePortfolio.skills,
    projects: Array.isArray(source.projects) ? (source.projects as unknown[]) : samplePortfolio.projects,
    experience: Array.isArray(source.experience) ? (source.experience as unknown[]) : samplePortfolio.experience,
    education: Array.isArray(source.education) ? (source.education as unknown[]) : samplePortfolio.education,
    certifications: Array.isArray(source.certifications) ? (source.certifications as unknown[]) : samplePortfolio.certifications,
    socials: source.socials && typeof source.socials === 'object' ? { ...samplePortfolio.socials, ...(source.socials as Record<string, unknown>) } : samplePortfolio.socials,
    resume: source.resume && typeof source.resume === 'object' ? { ...samplePortfolio.resume, ...(source.resume as Record<string, unknown>) } : samplePortfolio.resume,
  } as Portfolio;
}
