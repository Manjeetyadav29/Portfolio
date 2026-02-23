import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@seo/seo.service';
import { ROUTE_SEO_CONFIG } from '@seo/seo.constants';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly philosophies = [
    {
      icon: 'architecture',
      title: 'Architecture-First Mindset',
      description: 'Every project starts with a solid architecture. I design scalable, modular systems using feature-based structure, lazy loading, and strict separation of concerns.'
    },
    {
      icon: 'performance',
      title: 'Performance Obsessed',
      description: 'From CLS optimization to bundle analysis, I ensure every application meets Lighthouse 95+ scores. Performance is not an afterthought — it\'s built into every decision.'
    },
    {
      icon: 'modernization',
      title: 'Legacy Modernization Expert',
      description: 'Transformed AngularJS applications to modern Angular 17+ with standalone components, signals, and SSR — without disrupting business continuity.'
    },
    {
      icon: 'clean-code',
      title: 'Clean Code Advocate',
      description: 'Strict TypeScript, no `any` types, OnPush change detection everywhere, DRY principles, and comprehensive error handling. Code should read like a well-written document.'
    }
  ];

  readonly timeline = [
    {
      year: 'Present',
      title: 'Senior Angular Frontend Engineer',
      company: 'Enterprise Projects',
      description: 'Leading frontend architecture for enterprise-scale Angular applications. Implementing SSR, micro-frontends, and performance optimization strategies.'
    },
    {
      year: '2023',
      title: 'Angular Developer',
      company: 'Shopify Integration Projects',
      description: 'Built Shopify Embedded Apps using App Bridge, OAuth flows, and REST API integrations. Delivered pixel-perfect UIs with Bootstrap and Tailwind CSS.'
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      company: 'Web Applications',
      description: 'Developed and maintained Angular 8-14 applications. Led AngularJS to Angular migration efforts and established component architecture standards.'
    }
  ];

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG['/about']);
  }
}
