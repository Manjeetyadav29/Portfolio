import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  NgZone,
} from "@angular/core";
import { isPlatformBrowser, NgClass } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "@core/services/theme.service";
import { NavItem } from "@shared/models/portfolio.models";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  readonly themeService = inject(ThemeService);
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  private scrollListener: (() => void) | null = null;

  readonly navItems: NavItem[] = [
    { label: "Home", path: "/", exact: true },
    { label: "About", path: "/about" },
    { label: "Skills", path: "/skills" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Run outside Angular zone — only re-enters when value actually changes
    this.ngZone.runOutsideAngular(() => {
      let ticking = false;
      this.scrollListener = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const shouldBeScrolled = window.scrollY > 20;
            if (this.scrolled() !== shouldBeScrolled) {
              this.ngZone.run(() => this.scrolled.set(shouldBeScrolled));
            }
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener("scroll", this.scrollListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
