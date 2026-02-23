import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() appScrollReveal: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade-down' = 'fade-up';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.15;
  @Input() revealDuration = 600;

  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const element = this.el.nativeElement as HTMLElement;

    // Set initial hidden state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform();
    element.style.transition = `opacity ${this.revealDuration}ms ease-out ${this.revealDelay}ms, transform ${this.revealDuration}ms ease-out ${this.revealDelay}ms`;
    element.style.willChange = 'opacity, transform';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translate(0, 0) scale(1)';

          // Clean up will-change after animation completes
          setTimeout(() => {
            element.style.willChange = 'auto';
          }, this.revealDuration + this.revealDelay);

          this.observer?.unobserve(element);
        }
      },
      { threshold: this.revealThreshold }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private getInitialTransform(): string {
    switch (this.appScrollReveal) {
      case 'fade-up':
        return 'translateY(30px)';
      case 'fade-down':
        return 'translateY(-30px)';
      case 'fade-left':
        return 'translateX(-30px)';
      case 'fade-right':
        return 'translateX(30px)';
      case 'zoom-in':
        return 'scale(0.9)';
      default:
        return 'translateY(30px)';
    }
  }
}
