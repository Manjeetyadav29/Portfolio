import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '@seo/seo.service';
import { JsonLdService } from '@seo/json-ld.service';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import { BLOG_POSTS_DATA } from '../data/blog.data';
import { BlogPost } from '@shared/models/portfolio.models';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, SafeHtmlPipe],
  templateUrl: './blog-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  readonly post = signal<BlogPost | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = BLOG_POSTS_DATA.find(p => p.slug === slug) ?? null;
    this.post.set(found);

    if (found) {
      this.seo.updateMetaTags({
        title: found.title,
        description: found.excerpt,
        keywords: found.tags.join(', '),
        ogType: 'article'
      });

      this.jsonLd.setArticleSchema({
        title: found.title,
        description: found.excerpt,
        datePublished: found.publishedDate,
        imageUrl: found.coverImage
      });
    }
  }
}
