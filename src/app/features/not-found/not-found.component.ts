import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div class="text-center px-4">
        <p class="text-primary-500 dark:text-primary-400 font-semibold text-lg mb-4">404</p>
        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Page not found
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a routerLink="/" class="btn-primary px-8 py-3">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Go Home
          </a>
          <a routerLink="/contact" class="btn-outline px-8 py-3">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
