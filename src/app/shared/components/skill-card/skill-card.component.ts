import { Component, Input, ChangeDetectionStrategy, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Skill } from '@shared/models/portfolio.models';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div
      class="group relative"
      appScrollReveal="fade-up"
      [revealDelay]="delay">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {{ skill.name }}
        </span>
        <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
          {{ skill.proficiency }}%
        </span>
      </div>
      <div class="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-primary-500 to-blue-400 transition-all duration-1000 ease-out"
          [class.animate-progress-bar]="animateBar()"
          [style.--progress-width]="skill.proficiency + '%'"
          [style.width]="animateBar() ? undefined : '0%'"
          role="progressbar"
          [attr.aria-valuenow]="skill.proficiency"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-label]="skill.name + ' proficiency: ' + skill.proficiency + '%'">
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillCardComponent implements OnInit {
  @Input({ required: true }) skill!: Skill;
  @Input() delay = 0;

  private readonly platformId = inject(PLATFORM_ID);
  readonly animateBar = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Slight delay to ensure the element is in the DOM before animating
      setTimeout(() => this.animateBar.set(true), 100 + this.delay);
    }
  }
}
