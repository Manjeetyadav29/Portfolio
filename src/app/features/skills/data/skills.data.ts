import { SkillGroup } from '@shared/models/portfolio.models';

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend Core',
    description: 'Core frontend technologies and frameworks',
    icon: 'code',
    skills: [
      { name: 'Angular (8–17+)', category: 'frontend', proficiency: 95 },
      { name: 'TypeScript', category: 'frontend', proficiency: 93 },
      { name: 'RxJS', category: 'frontend', proficiency: 90 },
      { name: 'JavaScript (ES2022+)', category: 'frontend', proficiency: 92 },
      { name: 'HTML5', category: 'frontend', proficiency: 96 },
      { name: 'CSS3 / SCSS', category: 'frontend', proficiency: 92 },
      { name: 'AngularJS (Legacy)', category: 'frontend', proficiency: 85 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 88 },
      { name: 'Bootstrap', category: 'frontend', proficiency: 90 }
    ]
  },
  {
    category: 'architecture',
    label: 'Architecture',
    description: 'Application architecture patterns and strategies',
    icon: 'architecture',
    skills: [
      { name: 'Lazy Loading & Code Splitting', category: 'architecture', proficiency: 92 },
      { name: 'Angular SSR / Universal', category: 'architecture', proficiency: 88 },
      { name: 'Angular Signals', category: 'architecture', proficiency: 85 },
      { name: 'OnPush Change Detection', category: 'architecture', proficiency: 93 },
      { name: 'State Management', category: 'architecture', proficiency: 88 },
      { name: 'Dependency Injection', category: 'architecture', proficiency: 90 },
      { name: 'Reactive Forms', category: 'architecture', proficiency: 92 },
      { name: 'Standalone Components', category: 'architecture', proficiency: 90 }
    ]
  },
  {
    category: 'performance',
    label: 'Performance',
    description: 'Web performance optimization techniques',
    icon: 'performance',
    skills: [
      { name: 'CLS Optimization', category: 'performance', proficiency: 90 },
      { name: 'Lighthouse Auditing', category: 'performance', proficiency: 92 },
      { name: 'Bundle Optimization', category: 'performance', proficiency: 88 },
      { name: 'Core Web Vitals', category: 'performance', proficiency: 90 },
      { name: 'Image Optimization', category: 'performance', proficiency: 85 },
      { name: 'Critical CSS', category: 'performance', proficiency: 82 }
    ]
  },
  {
    category: 'integration',
    label: 'Integration',
    description: 'Third-party integrations and API development',
    icon: 'integration',
    skills: [
      { name: 'Shopify App Bridge', category: 'integration', proficiency: 88 },
      { name: 'REST API Integration', category: 'integration', proficiency: 92 },
      { name: 'OAuth Flow', category: 'integration', proficiency: 85 },
      { name: 'HTTP Interceptors', category: 'integration', proficiency: 90 },
      { name: 'Webhook Handling', category: 'integration', proficiency: 80 }
    ]
  },
  {
    category: 'tools',
    label: 'Tools & DevOps',
    description: 'Development tools and deployment workflows',
    icon: 'tools',
    skills: [
      { name: 'Git (Advanced)', category: 'tools', proficiency: 92 },
      { name: 'GitHub / GitLab', category: 'tools', proficiency: 90 },
      { name: 'VS Code', category: 'tools', proficiency: 95 },
      { name: 'CI/CD Pipelines', category: 'tools', proficiency: 80 },
      { name: 'npm / Yarn', category: 'tools', proficiency: 90 },
      { name: 'Chrome DevTools', category: 'tools', proficiency: 92 }
    ]
  }
];
