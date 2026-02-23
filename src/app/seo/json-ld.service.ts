import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { APP_CONSTANTS } from "@core/constants/app.constants";

@Injectable({ providedIn: "root" })
export class JsonLdService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  setPersonSchema(): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: APP_CONSTANTS.siteName,
      jobTitle: "Senior Angular Frontend Engineer",
      url: APP_CONSTANTS.siteUrl,
      email: APP_CONSTANTS.social.email,
      sameAs: [APP_CONSTANTS.social.linkedin, APP_CONSTANTS.social.github],
      knowsAbout: [
        "Angular",
        "TypeScript",
        "RxJS",
        "JavaScript",
        "Web Performance",
        "Server-Side Rendering",
        "Frontend Architecture",
      ],
    };
    this.setJsonLd(schema);
  }

  setArticleSchema(config: {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    imageUrl?: string;
  }): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: config.title,
      description: config.description,
      datePublished: config.datePublished,
      dateModified: config.dateModified || config.datePublished,
      image: config.imageUrl,
      author: {
        "@type": "Person",
        name: APP_CONSTANTS.siteName,
        url: APP_CONSTANTS.siteUrl,
      },
      publisher: {
        "@type": "Person",
        name: APP_CONSTANTS.siteName,
      },
    };
    this.setJsonLd(schema);
  }

  setWebsiteSchema(): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: APP_CONSTANTS.siteName,
      url: APP_CONSTANTS.siteUrl,
      description: APP_CONSTANTS.siteDescription,
    };
    this.setJsonLd(schema);
  }

  private setJsonLd(schema: Record<string, unknown>): void {
    const existing = this.document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existing) {
      existing.remove();
    }

    const script = this.document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
