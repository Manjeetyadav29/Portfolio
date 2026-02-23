import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '@seo/seo.service';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import { CASE_STUDIES_DATA } from '../data/case-studies.data';
import { CaseStudy } from '@shared/models/portfolio.models';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, SafeHtmlPipe],
  templateUrl: './case-study-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseStudyDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly study = signal<CaseStudy | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = CASE_STUDIES_DATA.find(s => s.slug === slug) ?? null;
    this.study.set(found);

    if (found) {
      this.seo.updateMetaTags({
        title: found.title,
        description: found.description,
        keywords: found.technologies.join(', '),
        ogType: 'article'
      });
    }
  }
}
