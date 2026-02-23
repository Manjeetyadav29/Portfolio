import { SeoConfig } from "./seo.service";

export const ROUTE_SEO_CONFIG: Record<string, SeoConfig> = {
  "/": {
    title: "Home",
    description:
      "Manjeet Yadav — Senior Angular Frontend Engineer. Building enterprise-scale web applications with Angular 17+, TypeScript, RxJS, and modern web technologies.",
    keywords:
      "Angular developer, frontend engineer, TypeScript, web development, RxJS, SSR, performance optimization",
  },
  "/about": {
    title: "About",
    description:
      "Learn about Manjeet Yadav's journey as a Senior Angular Frontend Engineer with 3+ years of enterprise application development experience.",
    keywords:
      "about, experience, angular developer, frontend expertise, enterprise applications",
  },
  "/skills": {
    title: "Skills & Expertise",
    description:
      "Technical skills and expertise of Manjeet Yadav including Angular 8-17, TypeScript, RxJS, Shopify App Bridge, and performance optimization.",
    keywords:
      "Angular, TypeScript, RxJS, Shopify, skills, frontend technologies, performance, SSR",
  },
  "/case-studies": {
    title: "Case Studies",
    description:
      "Real-world enterprise project case studies showcasing Angular architecture, performance optimization, and legacy modernization.",
    keywords:
      "case studies, projects, portfolio, Angular applications, enterprise, performance",
  },
  "/blog": {
    title: "Blog",
    description:
      "Technical articles and deep dives on Angular, RxJS, change detection, performance optimization, and modern frontend development.",
    keywords:
      "Angular blog, frontend articles, web development tutorials, RxJS, TypeScript",
  },
  "/contact": {
    title: "Contact",
    description:
      "Get in touch with Manjeet Yadav for frontend engineering opportunities, project collaboration, or technical consulting.",
    keywords:
      "contact, hire, frontend developer, Angular engineer, collaboration",
  },
};
