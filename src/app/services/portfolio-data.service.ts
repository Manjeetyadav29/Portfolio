import { Injectable } from '@angular/core';
import { SKILLS_DATA } from '@features/skills/data/skills.data';
import { CASE_STUDIES_DATA } from '@features/case-studies/data/case-studies.data';
import { BLOG_POSTS_DATA } from '@features/blog/data/blog.data';
import { SkillGroup, CaseStudy, BlogPost } from '@shared/models/portfolio.models';

/**
 * Centralized data access service.
 * Currently uses static data files.
 * Replace with HTTP calls when a backend API is available.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  getSkillGroups(): SkillGroup[] {
    return SKILLS_DATA;
  }

  getCaseStudies(): CaseStudy[] {
    return CASE_STUDIES_DATA;
  }

  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return CASE_STUDIES_DATA.find(s => s.slug === slug);
  }

  getBlogPosts(): BlogPost[] {
    return BLOG_POSTS_DATA;
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS_DATA.find(p => p.slug === slug);
  }
}
