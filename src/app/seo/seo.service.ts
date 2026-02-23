import { Injectable, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '@core/constants/app.constants';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  updateMetaTags(config: SeoConfig): void {
    const fullTitle = config.title === 'Home'
      ? APP_CONSTANTS.siteTitle
      : `${config.title} | ${APP_CONSTANTS.siteName}`;

    this.titleService.setTitle(fullTitle);

    // Standard meta tags
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Canonical URL
    const canonicalUrl = config.canonicalUrl || `${APP_CONSTANTS.siteUrl}${this.router.url}`;
    this.updateCanonicalUrl(canonicalUrl);

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({
      property: 'og:image',
      content: config.ogImage || APP_CONSTANTS.meta.defaultOgImage
    });
    this.meta.updateTag({ property: 'og:site_name', content: APP_CONSTANTS.siteName });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({
      name: 'twitter:image',
      content: config.ogImage || APP_CONSTANTS.meta.defaultOgImage
    });
    this.meta.updateTag({ name: 'twitter:creator', content: APP_CONSTANTS.meta.twitterHandle });

    // Robots
    if (config.noIndex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
