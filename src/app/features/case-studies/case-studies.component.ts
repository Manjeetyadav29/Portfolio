import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@seo/seo.service';
import { ROUTE_SEO_CONFIG } from '@seo/seo.constants';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { CASE_STUDIES_DATA } from './data/case-studies.data';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './case-studies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseStudiesComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly caseStudies = CASE_STUDIES_DATA;

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG['/case-studies']);
  }
}
