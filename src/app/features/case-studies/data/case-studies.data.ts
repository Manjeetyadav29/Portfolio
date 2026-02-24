import { CaseStudy } from '@shared/models/portfolio.models';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    slug: 'jira-replica',
    title: 'Jira Replica — Project Management Platform',
    subtitle: 'Full-Stack Angular 17 Application',
    description: 'Built a comprehensive Jira-like project management platform from scratch with real-time Kanban/Scrum boards, sprint management, issue tracking, and team collaboration — featuring Angular 17, NgRx state management, drag-and-drop, and a Node.js/Prisma/PostgreSQL backend with WebSocket support.',
    challenge: 'Creating a full-featured project management tool that mirrors Jira\'s core capabilities: multi-project support with Kanban and Scrum boards, a rich issue hierarchy (Epic, Story, Task, Sub-task, Bug), sprint planning with velocity tracking, drag-and-drop board management, real-time notifications via WebSockets, and secure authentication with Google OAuth and 2FA.',
    solution: 'Designed a monorepo architecture separating frontend (Angular 17 standalone components) and backend (Express + Prisma ORM). Implemented NgRx for centralized state management, Angular CDK for performant drag-and-drop, Chart.js for analytics dashboards (burndown/velocity charts), and Socket.IO for real-time collaboration. JWT-based auth with role-based access control ensures security.',
    architecture: 'Monorepo with Angular 17 frontend and Express.js backend. Frontend uses standalone components, NgRx store with effects for async operations, Angular Material UI, and CDK drag-and-drop. Backend uses Prisma ORM with PostgreSQL, JWT + refresh tokens, Socket.IO rooms for per-project real-time updates, and Winston structured logging.',
    results: [
      { label: 'Issue Types', before: '0', after: '5 Types', improvement: 'Epic, Story, Task, Bug, Sub-task' },
      { label: 'Board Views', before: '0', after: '2 Modes', improvement: 'Kanban + Scrum Boards' },
      { label: 'Real-time', before: 'None', after: 'WebSocket', improvement: 'Live notifications & updates' },
      { label: 'Auth Methods', before: 'None', after: '3 Methods', improvement: 'Email, Google OAuth, 2FA' }
    ],
    technologies: ['Angular 17', 'NgRx', 'Angular Material', 'Angular CDK', 'TypeScript', 'Node.js', 'Express', 'Prisma ORM', 'PostgreSQL', 'Socket.IO', 'Chart.js', 'JWT', 'Google OAuth'],
    codeSnippet: `// NgRx Board Effects — Drag-and-Drop Issue Reorder
@Injectable()
export class BoardEffects {
  moveIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.moveIssue),
      concatMap(({ issueId, targetStatus, position }) =>
        this.boardService.reorderIssue(issueId, targetStatus, position).pipe(
          map(updated => BoardActions.moveIssueSuccess({ issue: updated })),
          tap(() => this.socket.emit('board:updated', { issueId })),
          catchError(error => of(BoardActions.moveIssueFailure({ error })))
        )
      )
    )
  );
}`,
    year: 2024
  },
  {
    slug: 'mmc-multi-channel-connector',
    title: 'MMC — Multi-Channel Connector Platform',
    subtitle: 'Enterprise JHipster Application',
    description: 'Developed and maintained a large-scale enterprise Multi-Channel Connector (MMC) platform built on JHipster, enabling businesses to unify operations across multiple sales and distribution channels with a rich Angular dashboard, API-first architecture, and robust Spring Boot backend.',
    challenge: 'An enterprise platform managing multi-channel business operations grew to hundreds of entities and complex workflows. The Angular frontend needed to handle dynamic dashboards, internationalization (i18n), complex data grids with Syncfusion components, and seamless integration with a Spring Boot microservice backend — all while maintaining code quality via SonarQube and CI/CD pipelines.',
    solution: 'Leveraged JHipster\'s scaffolding for entity generation, Liquibase migrations, and Swagger/OpenAPI documentation. Built custom Angular modules for onboarding workflows, dashboard analytics with Chart.js, and multi-language support via ngx-translate. Implemented PWA capabilities for offline access and Docker containerization for consistent deployments.',
    architecture: 'JHipster monolith with Spring Boot backend and Angular frontend. Entity-driven development with JDL for code generation. Webpack-optimized builds, ng-bootstrap UI components, Syncfusion data grids, and i18n via ngx-translate. CI/CD with SonarQube quality gates and Docker deployment.',
    results: [
      { label: 'Channels Managed', before: '1', after: '10+', improvement: 'Unified multi-channel ops' },
      { label: 'Onboarding Time', before: '2 weeks', after: '2 days', improvement: '86% faster' },
      { label: 'API Coverage', before: '40%', after: '95%', improvement: 'Swagger/OpenAPI documented' },
      { label: 'Code Quality', before: 'No checks', after: 'A Rating', improvement: 'SonarQube enforced' }
    ],
    technologies: ['Angular 10', 'JHipster', 'Spring Boot', 'TypeScript', 'ng-bootstrap', 'Syncfusion', 'Chart.js', 'ngx-translate', 'Webpack', 'Docker', 'SonarQube', 'Liquibase', 'Swagger'],
    codeSnippet: `// Multi-Channel Dashboard — Dynamic Widget Loader
@Component({
  selector: 'mmc-dashboard',
  template: \`
    <div class="dashboard-grid">
      <mmc-widget *ngFor="let widget of activeWidgets"
        [config]="widget"
        [channelData]="channelData$ | async"
        (refresh)="onWidgetRefresh($event)">
      </mmc-widget>
    </div>
  \`
})
export class DashboardComponent implements OnInit {
  channelData$ = this.store.select(selectAllChannels);
  activeWidgets = this.dashboardService.getActiveWidgets();
}`,
    year: 2023
  },
  {
    slug: 'shopify-embedded-app',
    title: 'Shopify Embedded App',
    subtitle: 'E-Commerce Platform Integration',
    description: 'Built a fully embedded Shopify app using Angular and App Bridge, enabling merchants to manage custom product workflows directly within the Shopify admin.',
    challenge: 'Shopify\'s embedded app ecosystem requires strict compliance with App Bridge navigation, OAuth session tokens, and a responsive UI that matches the Polaris design system. The app needed to handle real-time inventory updates via REST APIs while maintaining seamless UX inside the Shopify admin iframe.',
    solution: 'Designed a modular Angular architecture with a dedicated Shopify integration layer. Implemented OAuth flow with session token refresh, HTTP interceptors for authenticated API calls, and a custom bridge service wrapping App Bridge actions. Used reactive patterns with RxJS for real-time data synchronization.',
    architecture: 'Feature-based module structure with a core Shopify service layer. HTTP interceptors handle session token injection. State managed via BehaviorSubjects for shared merchant data. Lazy-loaded feature routes for product management, order tracking, and settings.',
    results: [
      { label: 'Load Time', before: '4.2s', after: '1.8s', improvement: '57% faster' },
      { label: 'Bundle Size', before: '1.2MB', after: '420KB', improvement: '65% reduction' },
      { label: 'API Response', before: '800ms avg', after: '350ms avg', improvement: '56% faster' },
      { label: 'User Satisfaction', before: '3.2/5', after: '4.7/5', improvement: '47% increase' }
    ],
    technologies: ['Angular 15', 'TypeScript', 'Shopify App Bridge', 'OAuth 2.0', 'REST APIs', 'RxJS', 'Bootstrap', 'Node.js'],
    codeSnippet: `// Shopify Session Token Interceptor
@Injectable()
export class ShopifyAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return from(getSessionToken(this.app)).pipe(
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: { Authorization: \`Bearer \${token}\` }
        });
        return next.handle(authReq);
      })
    );
  }
}`,
    year: 2023
  },
  {
    slug: 'angularjs-to-angular-migration',
    title: 'AngularJS to Angular Migration',
    subtitle: 'Legacy Modernization Project',
    description: 'Led the complete migration of a large-scale AngularJS 1.6 application to Angular 14+ with standalone components, achieving 70% performance improvement and zero downtime.',
    challenge: 'A mission-critical enterprise dashboard built on AngularJS 1.6 with 200+ controllers, 150+ directives, and deeply nested scope hierarchies. The application suffered from memory leaks, poor performance, and inability to hire developers for the legacy stack.',
    solution: 'Implemented a phased migration strategy using ngUpgrade for hybrid mode. Systematically converted controllers to components, replaced $scope with proper component bindings, migrated services to Injectable classes, and replaced $http with HttpClient. Applied OnPush change detection throughout.',
    architecture: 'Hybrid Angular/AngularJS setup during migration. New features built as standalone Angular components. Shared state bridged via downgraded Angular services. Route-by-route migration with feature flags for gradual rollout.',
    results: [
      { label: 'Page Load', before: '6.5s', after: '2.1s', improvement: '68% faster' },
      { label: 'Memory Usage', before: '180MB', after: '65MB', improvement: '64% reduction' },
      { label: 'Bundle Size', before: '2.8MB', after: '680KB', improvement: '76% smaller' },
      { label: 'Time to Interactive', before: '8.2s', after: '2.8s', improvement: '66% faster' }
    ],
    technologies: ['AngularJS 1.6', 'Angular 14', 'ngUpgrade', 'TypeScript', 'RxJS', 'Webpack', 'Karma', 'Jasmine'],
    codeSnippet: `// Hybrid Bootstrap Configuration
@NgModule({
  imports: [BrowserModule, UpgradeModule],
  declarations: [AppComponent],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    this.upgrade.bootstrap(
      document.documentElement,
      ['legacyApp'],
      { strictDi: true }
    );
  }
}`,
    year: 2023
  },
  {
    slug: 'component-refactoring',
    title: 'Enterprise Component Refactoring',
    subtitle: 'Scalability & Maintainability Overhaul',
    description: 'Refactored a monolithic Angular application with 500+ components into a feature-based, lazy-loaded architecture with reusable shared component library.',
    challenge: 'A rapidly growing Angular application had become unmaintainable: massive shared modules importing everything, circular dependencies, 30+ second build times, and components with 1000+ line templates. Developer onboarding took weeks.',
    solution: 'Broke down the monolith into feature-based modules with strict boundaries. Created a shared component library with Storybook documentation. Implemented barrel exports, path aliases, and strict ESLint rules to prevent regression. Migrated to standalone components for tree-shaking.',
    architecture: 'Feature-sliced architecture with core, shared, and feature layers. Each feature encapsulates routes, components, services, and models. Shared library published as workspace package. Strict dependency rules enforced via ESLint boundaries plugin.',
    results: [
      { label: 'Build Time', before: '32s', after: '8s', improvement: '75% faster' },
      { label: 'Bundle Size', before: '3.5MB', after: '890KB', improvement: '75% reduction' },
      { label: 'Component Count', before: '500+ tangled', after: '320 organized', improvement: '36% consolidated' },
      { label: 'Dev Onboarding', before: '3 weeks', after: '3 days', improvement: '86% faster' }
    ],
    technologies: ['Angular 16', 'Standalone Components', 'TypeScript', 'ESLint', 'Storybook', 'Nx Workspace', 'Path Aliases'],
    codeSnippet: `// Feature-based lazy route structure
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard],
    data: { preload: true }
  }
];`,
    year: 2024
  },
  {
    slug: 'performance-optimization',
    title: 'CLS & Performance Optimization',
    subtitle: 'Lighthouse Score Transformation',
    description: 'Transformed a poorly performing Angular application from Lighthouse score of 42 to 96+ by systematically addressing CLS, LCP, FID, and bundle optimization.',
    challenge: 'An e-commerce Angular application had catastrophic Core Web Vitals: CLS of 0.42 (target <0.1), LCP of 7.2s, and a Lighthouse performance score of 42. Google Search Console flagged 80% of pages as "Poor" for mobile experience.',
    solution: 'Conducted thorough performance audit using Lighthouse, WebPageTest, and Chrome DevTools. Fixed CLS by adding explicit dimensions to all images/ads, implementing font-display:swap, and reserving space for dynamic content. Optimized LCP with critical CSS inlining, image lazy loading, and preconnect hints. Reduced JavaScript with code splitting and tree-shaking.',
    architecture: 'Implemented preloading strategy for critical routes, Angular Universal SSR for initial paint, image optimization pipeline with WebP fallbacks, and service worker caching for repeat visits.',
    results: [
      { label: 'Lighthouse Score', before: '42', after: '96', improvement: '128% increase' },
      { label: 'CLS', before: '0.42', after: '0.02', improvement: '95% reduction' },
      { label: 'LCP', before: '7.2s', after: '1.8s', improvement: '75% faster' },
      { label: 'First Contentful Paint', before: '4.1s', after: '0.9s', improvement: '78% faster' }
    ],
    technologies: ['Angular 15', 'Angular Universal', 'Lighthouse', 'WebPageTest', 'Critical CSS', 'WebP', 'Service Worker', 'Preload Strategy'],
    codeSnippet: `// Image optimization with NgOptimizedImage
@Component({
  template: \`
    <img
      ngSrc="hero-banner.webp"
      width="1200"
      height="600"
      priority
      placeholder="blur"
      [loaderParams]="{ quality: 80 }"
    />
  \`,
  imports: [NgOptimizedImage]
})
export class HeroBannerComponent {}`,
    year: 2024
  }
];
