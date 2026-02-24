import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  template: `
    @if (!hidden()) {
      <div
        class="preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        [class.preloader-exit]="exiting()"
        aria-hidden="true">

        <!-- Background -->
        <div class="absolute inset-0 bg-slate-950"></div>

        <!-- Animated grid pattern -->
        <div class="absolute inset-0 opacity-[0.03]"
          style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;">
        </div>

        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          <div class="particle particle-5"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center">
          <!-- Multilingual greeting cycle -->
          <div class="greeting-container h-16 sm:h-20 flex items-center justify-center mb-6 overflow-hidden">
            <p class="greeting-text text-3xl sm:text-5xl font-extrabold"
               [class]="greetingFading() ? 'greeting-fade-out' : 'greeting-fade-in'"
               [style.color]="greetings[currentGreetingIndex()].color">
              {{ greetings[currentGreetingIndex()].text }}
            </p>
          </div>

          <!-- Logo mark -->
          <div class="preloader-logo mb-6 opacity-0">
            <div class="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-primary-500/30">
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="4" height="4" fill="white" />
                <rect x="8" y="2" width="4" height="4" fill="white" opacity="0.6" />
                <rect x="14" y="2" width="4" height="4" fill="white" />
                <rect x="2" y="8" width="4" height="4" fill="white" opacity="0.6" />
                <rect x="8" y="8" width="4" height="4" fill="white" />
                <rect x="14" y="8" width="4" height="4" fill="white" opacity="0.6" />
                <rect x="2" y="14" width="4" height="4" fill="white" />
                <rect x="8" y="14" width="4" height="4" fill="white" opacity="0.6" />
                <rect x="14" y="14" width="4" height="4" fill="white" />
              </svg>
            </div>
          </div>

          <!-- Name text reveal -->
          <div class="overflow-hidden mb-2">
            <h2 class="preloader-name text-2xl sm:text-3xl font-bold text-white tracking-tight translate-y-full">
              Manjeet <span class="text-primary-400">Yadav</span>
            </h2>
          </div>

          <!-- Title text reveal -->
          <div class="overflow-hidden mb-10">
            <p class="preloader-title text-xs sm:text-sm text-slate-500 font-medium tracking-[0.25em] uppercase translate-y-full">
              Senior Frontend Engineer
            </p>
          </div>

          <!-- Progress bar -->
          <div class="w-48 sm:w-64 mx-auto">
            <div class="h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div class="preloader-progress h-full bg-gradient-to-r from-primary-400 to-blue-400 rounded-full"
                   [style.width.%]="progress()">
              </div>
            </div>
            <p class="text-[10px] text-slate-600 mt-3 font-mono tracking-wider">{{ progress() }}%</p>
          </div>
        </div>

        <!-- Corner accents -->
        <div class="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-slate-700 opacity-0 preloader-corner-tl"></div>
        <div class="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-slate-700 opacity-0 preloader-corner-tr"></div>
        <div class="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-slate-700 opacity-0 preloader-corner-bl"></div>
        <div class="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-slate-700 opacity-0 preloader-corner-br"></div>
      </div>
    }
  `,
  styles: [`
    .preloader-logo {
      animation: preloaderFadeIn 0.6s ease-out 0.2s forwards;
    }
    .preloader-name {
      animation: preloaderSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
    }
    .preloader-title {
      animation: preloaderSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
    }
    .preloader-progress {
      transition: width 0.3s ease-out;
    }
    .preloader-corner-tl,
    .preloader-corner-tr,
    .preloader-corner-bl,
    .preloader-corner-br {
      animation: preloaderFadeIn 0.5s ease-out 0.3s forwards;
    }

    .preloader-exit {
      animation: preloaderExit 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Greeting animations */
    .greeting-fade-in {
      animation: greetFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .greeting-fade-out {
      animation: greetFadeOut 0.3s ease-in forwards;
    }

    /* Floating particles */
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(96, 165, 250, 0.3);
    }
    .particle-1 { top: 20%; left: 15%; animation: particleFloat 4s ease-in-out infinite; }
    .particle-2 { top: 60%; left: 80%; animation: particleFloat 5s ease-in-out 1s infinite; width: 3px; height: 3px; }
    .particle-3 { top: 80%; left: 30%; animation: particleFloat 6s ease-in-out 2s infinite; width: 5px; height: 5px; background: rgba(147, 197, 253, 0.2); }
    .particle-4 { top: 30%; left: 70%; animation: particleFloat 4.5s ease-in-out 0.5s infinite; width: 3px; height: 3px; }
    .particle-5 { top: 50%; left: 50%; animation: particleFloat 5.5s ease-in-out 1.5s infinite; width: 6px; height: 6px; background: rgba(59, 130, 246, 0.15); }

    @keyframes preloaderFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes preloaderSlideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes preloaderExit {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    @keyframes greetFadeIn {
      0% { opacity: 0; transform: translateY(20px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes greetFadeOut {
      0% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
    }
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
      25% { transform: translateY(-15px) translateX(10px); opacity: 0.6; }
      50% { transform: translateY(-25px) translateX(-5px); opacity: 0.4; }
      75% { transform: translateY(-10px) translateX(15px); opacity: 0.7; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly progress = signal(0);
  readonly exiting = signal(false);
  readonly hidden = signal(false);
  readonly currentGreetingIndex = signal(0);
  readonly greetingFading = signal(false);

  @Output() readonly loadingComplete = new EventEmitter<void>();

  readonly greetings = [
    { text: 'Namaste', color: '#f97316' },
    { text: 'Hello', color: '#60a5fa' },
    { text: 'Hola', color: '#f59e0b' },
    { text: 'Bonjour', color: '#a78bfa' },
    { text: 'Ciao', color: '#34d399' },
    { text: 'Konnichiwa', color: '#f472b6' },
    { text: 'Annyeong', color: '#38bdf8' },
    { text: 'Hallo', color: '#fb923c' },
  ];

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private greetingIntervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.hidden.set(true);
      return;
    }

    // Cycle through greetings
    this.greetingIntervalId = setInterval(() => {
      this.greetingFading.set(true);
      setTimeout(() => {
        this.currentGreetingIndex.update(i => (i + 1) % this.greetings.length);
        this.greetingFading.set(false);
      }, 300);
    }, 400);

    let current = 0;
    this.intervalId = setInterval(() => {
      if (current < 100) {
        const increment = current < 30 ? 3 : current < 60 ? 2 : current < 85 ? 2 : 1;
        current = Math.min(100, current + increment);
        this.progress.set(current);
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        if (this.greetingIntervalId) {
          clearInterval(this.greetingIntervalId);
          this.greetingIntervalId = null;
        }
        // Start exit animation after brief pause
        setTimeout(() => {
          this.exiting.set(true);
          setTimeout(() => {
            this.hidden.set(true);
            this.loadingComplete.emit();
          }, 800);
        }, 400);
      }
    }, 35);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.greetingIntervalId) clearInterval(this.greetingIntervalId);
  }
}
