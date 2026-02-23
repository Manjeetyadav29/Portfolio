import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { SeoService } from '@seo/seo.service';
import { ROUTE_SEO_CONFIG } from '@seo/seo.constants';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { SkillCardComponent } from '@shared/components/skill-card/skill-card.component';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { SKILLS_DATA } from './data/skills.data';
import { SkillCategory, SkillGroup } from '@shared/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent, SkillCardComponent, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly skillGroups = SKILLS_DATA;
  readonly activeCategory = signal<SkillCategory | 'all'>('all');

  get filteredGroups(): SkillGroup[] {
    const active = this.activeCategory();
    if (active === 'all') return this.skillGroups;
    return this.skillGroups.filter(g => g.category === active);
  }

  readonly categories: { key: SkillCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'architecture', label: 'Architecture' },
    { key: 'performance', label: 'Performance' },
    { key: 'integration', label: 'Integration' },
    { key: 'tools', label: 'Tools' }
  ];

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG['/skills']);
  }

  setCategory(category: SkillCategory | 'all'): void {
    this.activeCategory.set(category);
  }

  onTabKeydown(event: KeyboardEvent, index: number): void {
    let newIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      newIndex = (index + 1) % this.categories.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      newIndex = (index - 1 + this.categories.length) % this.categories.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      newIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      newIndex = this.categories.length - 1;
    } else {
      return;
    }

    this.setCategory(this.categories[newIndex].key);
    const buttons = document.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons[newIndex]?.focus();
  }
}
