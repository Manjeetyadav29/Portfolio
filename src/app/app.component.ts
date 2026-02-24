import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShellComponent } from '@layout/shell/shell.component';
import { PreloaderComponent } from '@shared/components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShellComponent, PreloaderComponent],
  template: `
    <app-preloader />
    <app-shell />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
