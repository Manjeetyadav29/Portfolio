import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly isServer = isPlatformServer(this.platformId);

  get window(): Window | null {
    return this.isBrowser ? window : null;
  }

  get document(): Document | null {
    return this.isBrowser ? document : null;
  }
}
