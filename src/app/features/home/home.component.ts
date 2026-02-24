import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { SeoService } from "@seo/seo.service";
import { JsonLdService } from "@seo/json-ld.service";
import { ROUTE_SEO_CONFIG } from "@seo/seo.constants";
import { SocialLinksComponent } from "@shared/components/social-links/social-links.component";
import { APP_CONSTANTS } from "@core/constants/app.constants";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  readonly resumeUrl = APP_CONSTANTS.resume.downloadUrl;

  readonly stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Delivered" },
    { value: "95+", label: "Lighthouse Score" },
    { value: "50%", label: "Performance Gains" },
  ];

  readonly techStack = [
    'Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS', 'Node.js',
    'PostgreSQL', 'Prisma', 'Socket.IO', 'SSR', 'Signals', 'JHipster',
    'Shopify', 'REST APIs', 'OAuth', 'Docker', 'Git', 'CI/CD'
  ];

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG["/"]);
    this.jsonLd.setPersonSchema();
  }
}
