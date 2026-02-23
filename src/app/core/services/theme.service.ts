import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly STORAGE_KEY = 'portfolio-theme';

  private readonly _theme = signal<Theme>(this.getInitialTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');
  readonly icon = computed(() => this._theme() === 'dark' ? 'sun' : 'moon');

  constructor() {
    effect(() => {
      const currentTheme = this._theme();
      if (this.isBrowser) {
        const html = document.documentElement;
        if (currentTheme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
        try {
          localStorage.setItem(this.STORAGE_KEY, currentTheme);
        } catch {
          // localStorage unavailable (private browsing, storage full)
        }
      }
    });
  }

  toggle(): void {
    this._theme.update(current => current === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
