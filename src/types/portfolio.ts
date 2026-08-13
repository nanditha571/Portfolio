export interface Portfolio {
  id?: string;
  slug?: string;
  username: string;
  personal: PersonalInfo;
  about: AboutInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  socials: Socials;
  resume: ResumeInfo;
  theme: string;
  publishedAt?: string;
  updatedAt: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  location: string;
}

export interface AboutInfo {
  bio: string;
  tagline: string;
}

export interface Skill {
  id?: string;
  name: string;
  level?: number;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Socials {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
}

export interface ResumeInfo {
  url: string;
  fileName: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  accent: string;
  Component: React.ComponentType<{ data: Portfolio }>;
}

export interface BuilderStep {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
