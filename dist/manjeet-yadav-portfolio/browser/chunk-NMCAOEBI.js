var e=[{slug:"angular-change-detection-deep-dive",title:"Deep Dive into Angular Change Detection",excerpt:"Understanding how Angular detects changes, the difference between Default and OnPush strategies, and how Signals are reshaping reactivity in Angular 17+.",content:`
<h2>How Angular Change Detection Works</h2>
<p>Angular's change detection is the mechanism that keeps the UI in sync with the application state. Every time an event occurs \u2014 a click, HTTP response, or timer \u2014 Angular checks the component tree to determine what needs to be updated.</p>

<h3>Default vs OnPush Strategy</h3>
<p>With the <strong>Default</strong> strategy, Angular checks every component in the tree on every change detection cycle. This is simple but inefficient for large applications.</p>

<p><strong>OnPush</strong> change detection tells Angular to only check a component when:</p>
<ul>
<li>An <code>@Input()</code> reference changes (not just mutation)</li>
<li>An event handler in the component fires</li>
<li>An Observable bound with <code>async</code> pipe emits</li>
<li><code>markForCheck()</code> is called manually</li>
</ul>

<h3>Implementing OnPush</h3>
<pre><code>@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    &lt;div class="card"&gt;
      &lt;h3&gt;{{ user.name }}&lt;/h3&gt;
      &lt;p&gt;{{ user.email }}&lt;/p&gt;
    &lt;/div&gt;
  \`
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
}</code></pre>

<h3>The Signals Revolution</h3>
<p>Angular Signals introduce fine-grained reactivity. Instead of checking entire component trees, Signals allow Angular to know <em>exactly</em> which bindings changed, enabling surgical DOM updates.</p>

<pre><code>@Component({
  template: \`&lt;p&gt;Count: {{ count() }}&lt;/p&gt;\`
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}</code></pre>

<h3>Best Practices</h3>
<ol>
<li>Use <strong>OnPush</strong> on every component as a baseline</li>
<li>Prefer <strong>immutable data</strong> patterns</li>
<li>Use <code>async</code> pipe or Signals instead of manual subscriptions</li>
<li>Avoid calling methods in templates \u2014 use computed signals or pipes instead</li>
<li>Profile with Angular DevTools to find unnecessary change detection cycles</li>
</ol>
`,publishedDate:"2024-12-15",tags:["Angular","Change Detection","OnPush","Signals","Performance"],readingTime:8},{slug:"rxjs-operators-explained",title:"Essential RxJS Operators for Angular Developers",excerpt:"A practical guide to the most useful RxJS operators in Angular: switchMap, mergeMap, concatMap, debounceTime, distinctUntilChanged, and more.",content:`
<h2>Why RxJS Matters in Angular</h2>
<p>RxJS is the backbone of Angular's reactive architecture. From HTTP calls to form value changes, Observables power the data flow in every Angular application. Mastering the right operators makes the difference between clean, bug-free code and callback hell.</p>

<h3>The Big Three: switchMap, mergeMap, concatMap</h3>

<h4>switchMap \u2014 Cancel Previous</h4>
<p>Use when you only care about the latest emission. Perfect for search typeaheads and route parameter changes.</p>
<pre><code>// Search typeahead \u2014 cancels previous HTTP call on new input
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.searchService.search(query))
).subscribe(results => this.results = results);</code></pre>

<h4>mergeMap \u2014 Run in Parallel</h4>
<p>Use when order doesn't matter and you want concurrent execution.</p>
<pre><code>// Upload multiple files simultaneously
this.files$.pipe(
  mergeMap(file => this.uploadService.upload(file), 3) // max 3 concurrent
).subscribe(response => this.uploaded.push(response));</code></pre>

<h4>concatMap \u2014 Preserve Order</h4>
<p>Use when order matters. Each emission waits for the previous to complete.</p>
<pre><code>// Sequential API calls that depend on order
this.actions$.pipe(
  concatMap(action => this.api.process(action))
).subscribe();</code></pre>

<h3>Filtering Operators</h3>
<pre><code>// Debounce + distinct for form inputs
this.form.get('email')!.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged(),
  filter(email => email.length > 3),
  switchMap(email => this.validateEmail(email))
);</code></pre>

<h3>Error Handling</h3>
<pre><code>// Retry with exponential backoff
this.http.get('/api/data').pipe(
  retry({
    count: 3,
    delay: (error, retryCount) =>
      timer(Math.pow(2, retryCount) * 1000)
  }),
  catchError(err => {
    console.error('All retries failed', err);
    return of({ data: [], error: true });
  })
);</code></pre>

<h3>Quick Reference</h3>
<table>
<tr><th>Operator</th><th>When to Use</th></tr>
<tr><td><code>switchMap</code></td><td>Search, route params, latest-only</td></tr>
<tr><td><code>mergeMap</code></td><td>Parallel operations, file uploads</td></tr>
<tr><td><code>concatMap</code></td><td>Ordered sequential operations</td></tr>
<tr><td><code>exhaustMap</code></td><td>Ignore new while processing (login buttons)</td></tr>
<tr><td><code>debounceTime</code></td><td>Delay until input settles</td></tr>
<tr><td><code>distinctUntilChanged</code></td><td>Skip duplicate emissions</td></tr>
<tr><td><code>takeUntilDestroyed</code></td><td>Auto-unsubscribe on component destroy</td></tr>
</table>
`,publishedDate:"2024-11-20",tags:["RxJS","Angular","Reactive Programming","Operators"],readingTime:10},{slug:"fix-cls-angularjs",title:"How to Fix CLS Issues in AngularJS Applications",excerpt:"Practical strategies for reducing Cumulative Layout Shift in legacy AngularJS apps without a full rewrite.",content:`
<h2>The CLS Problem in AngularJS</h2>
<p>Cumulative Layout Shift (CLS) measures visual stability \u2014 how much the page content shifts unexpectedly during loading. AngularJS applications are particularly vulnerable to CLS because of how the framework initializes and renders content.</p>

<h3>Common CLS Causes in AngularJS</h3>
<ol>
<li><strong>ng-cloak flash</strong> \u2014 Content briefly shows template syntax before AngularJS compiles it</li>
<li><strong>Images without dimensions</strong> \u2014 Images load and push content down</li>
<li><strong>Dynamic content injection</strong> \u2014 ng-repeat lists rendering after API calls</li>
<li><strong>Font loading shifts</strong> \u2014 FOUT (Flash of Unstyled Text) causing reflows</li>
<li><strong>Third-party widgets</strong> \u2014 Ads, chat widgets, analytics loading asynchronously</li>
</ol>

<h3>Fix 1: Proper ng-cloak Usage</h3>
<pre><code>/* Add this CSS ABOVE your AngularJS script */
[ng-cloak], .ng-cloak {
  display: none !important;
}

/* Reserve space for cloaked elements */
.content-placeholder {
  min-height: 200px; /* Match expected content height */
}</code></pre>

<h3>Fix 2: Explicit Image Dimensions</h3>
<pre><code>&lt;!-- BAD: No dimensions, causes layout shift --&gt;
&lt;img ng-src="{{product.image}}"&gt;

&lt;!-- GOOD: Explicit dimensions prevent shift --&gt;
&lt;img ng-src="{{product.image}}"
     width="300" height="200"
     style="aspect-ratio: 3/2; object-fit: cover;"&gt;</code></pre>

<h3>Fix 3: Skeleton Screens</h3>
<pre><code>&lt;div ng-if="!dataLoaded" class="skeleton"&gt;
  &lt;div class="skeleton-line" style="height: 24px; width: 60%;"&gt;&lt;/div&gt;
  &lt;div class="skeleton-line" style="height: 16px; width: 80%;"&gt;&lt;/div&gt;
  &lt;div class="skeleton-line" style="height: 16px; width: 40%;"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div ng-if="dataLoaded"&gt;
  {{ actualContent }}
&lt;/div&gt;</code></pre>

<h3>Fix 4: Font Loading Strategy</h3>
<pre><code>/* Use font-display: swap and preload */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
}

/* Preload in HTML head */
&lt;link rel="preload" href="/fonts/custom.woff2"
      as="font" type="font/woff2" crossorigin&gt;</code></pre>

<h3>Measuring CLS</h3>
<p>Use Chrome DevTools Performance tab, Lighthouse, or the Web Vitals JavaScript library to measure CLS before and after fixes. Target a CLS score below 0.1 for "Good" Core Web Vitals.</p>
`,publishedDate:"2024-10-10",tags:["AngularJS","CLS","Performance","Core Web Vitals","Legacy"],readingTime:7},{slug:"angular-universal-seo-guide",title:"Complete Angular Universal SSR & SEO Guide",excerpt:"How to implement Server-Side Rendering in Angular 17+ for maximum SEO impact, including meta tags, structured data, and prerendering strategies.",content:`
<h2>Why SSR Matters for SEO</h2>
<p>Search engines can render JavaScript, but SSR ensures your content is immediately available in the initial HTML response. This is critical for:</p>
<ul>
<li><strong>Faster indexing</strong> \u2014 crawlers get complete HTML without executing JS</li>
<li><strong>Social sharing</strong> \u2014 Open Graph and Twitter Card meta tags are present in the HTML</li>
<li><strong>Performance</strong> \u2014 faster First Contentful Paint and Largest Contentful Paint</li>
</ul>

<h3>Setting Up Angular SSR (Angular 17+)</h3>
<p>Angular 17 replaced the old Universal package with <code>@angular/ssr</code> and the new <code>application</code> builder.</p>

<pre><code>// angular.json
{
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:application",
      "options": {
        "browser": "src/main.ts",
        "server": "src/main.server.ts",
        "ssr": { "entry": "server.ts" },
        "prerender": true
      }
    }
  }
}</code></pre>

<h3>Dynamic Meta Tags Service</h3>
<pre><code>@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);

  updateMetaTags(config: {
    title: string;
    description: string;
    ogImage?: string;
  }): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({
      name: 'description',
      content: config.description
    });
    this.meta.updateTag({
      property: 'og:title',
      content: config.title
    });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description
    });
  }
}</code></pre>

<h3>JSON-LD Structured Data</h3>
<pre><code>// Inject structured data for rich search results
setArticleSchema(article: Article): void {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Manjeet Yadav'
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}</code></pre>

<h3>Prerendering Strategy</h3>
<p>For static content like portfolios and blogs, prerendering generates HTML at build time \u2014 the fastest possible delivery with zero server load.</p>

<h3>SEO Checklist for Angular SSR</h3>
<ol>
<li>Unique <code>&lt;title&gt;</code> per page</li>
<li>Meta description under 160 characters</li>
<li>Canonical URL on every page</li>
<li>Open Graph tags for social sharing</li>
<li>JSON-LD structured data (Person, Article)</li>
<li>Sitemap.xml with all routes</li>
<li>Robots.txt allowing crawler access</li>
<li>Semantic HTML with proper heading hierarchy</li>
</ol>
`,publishedDate:"2024-09-05",tags:["Angular","SSR","SEO","Angular Universal","Prerendering"],readingTime:9}];export{e as a};
