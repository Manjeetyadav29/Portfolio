import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent),
    data: { animation: 'HomePage' }
  },
  {
    path: 'about',
    loadComponent: () => import('@features/about/about.component').then(m => m.AboutComponent),
    data: { animation: 'AboutPage' }
  },
  {
    path: 'skills',
    loadComponent: () => import('@features/skills/skills.component').then(m => m.SkillsComponent),
    data: { animation: 'SkillsPage' }
  },
  {
    path: 'case-studies',
    loadComponent: () => import('@features/case-studies/case-studies.component').then(m => m.CaseStudiesComponent),
    data: { animation: 'CaseStudiesPage' }
  },
  {
    path: 'case-studies/:slug',
    loadComponent: () => import('@features/case-studies/case-study-detail/case-study-detail.component').then(m => m.CaseStudyDetailComponent),
    data: { animation: 'CaseStudyDetailPage' }
  },
  {
    path: 'blog',
    loadComponent: () => import('@features/blog/blog.component').then(m => m.BlogComponent),
    data: { animation: 'BlogPage' }
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('@features/blog/blog-post/blog-post.component').then(m => m.BlogPostComponent),
    data: { animation: 'BlogPostPage' }
  },
  {
    path: 'contact',
    loadComponent: () => import('@features/contact/contact.component').then(m => m.ContactComponent),
    data: { animation: 'ContactPage' }
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found/not-found.component').then(m => m.NotFoundComponent),
    data: { animation: 'NotFoundPage' }
  }
];
