import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@seo/seo.service';
import { ROUTE_SEO_CONFIG } from '@seo/seo.constants';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { BLOG_POSTS_DATA } from './data/blog.data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly posts = BLOG_POSTS_DATA;

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG['/blog']);
  }
}
