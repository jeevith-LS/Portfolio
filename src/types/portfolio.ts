export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack' | 'AI & ML' | 'Cloud & DevOps' | 'Mobile' | 'Tools & Systems';
  tags: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  architectureDetails?: string;
  imageColor?: string;
  createdAt: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    highlight?: boolean;
    badge?: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  featuredBadge?: string;
}

export interface SystemStats {
  projectsCount: number;
  skillsCount: number;
  yearsExperience: number;
  coffeeConsumed: number;
  uptimePercentage: string;
  messagesCount: number;
}
