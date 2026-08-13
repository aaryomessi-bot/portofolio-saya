import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'FULLSTACK' | 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'LAINNYA';
  description: string;
  fullDescription?: string;
  techStack: string[];
  imageUrl?: string;
  isFeatured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  highlights?: string;
  isCustom?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  proficiency: number; // percentage
  description: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface TerminalOutput {
  id: string;
  command: string;
  result: string | ReactNode;
  type: 'output' | 'error' | 'system' | 'success';
}

