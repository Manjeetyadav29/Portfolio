import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div class="text-center mb-12 sm:mb-16" appScrollReveal="fade-up">
      @if (label) {
        <div class="inline-flex items-center gap-2 mb-4">
          <span class="h-px w-8 bg-primary-400 dark:bg-primary-500"></span>
          <p class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-widest">
            {{ label }}
          </p>
          <span class="h-px w-8 bg-primary-400 dark:bg-primary-500"></span>
        </div>
      }
      <h2 class="heading-2 text-slate-900 dark:text-white mb-4">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      }
      <div class="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" aria-hidden="true"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() label = '';
}
