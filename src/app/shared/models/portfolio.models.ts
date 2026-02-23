export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon?: string;
}

export type SkillCategory = 'frontend' | 'architecture' | 'performance' | 'integration' | 'tools';

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  architecture: string;
  results: CaseStudyMetric[];
  technologies: string[];
  codeSnippet?: string;
  year: number;
}

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  readingTime: number;
  coverImage?: string;
}

export interface SocialLink {
  platform: 'email' | 'linkedin' | 'github';
  url: string;
  label: string;
}

export interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}
