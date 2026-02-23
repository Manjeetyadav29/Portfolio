import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { SeoService } from '@seo/seo.service';
import { ROUTE_SEO_CONFIG } from '@seo/seo.constants';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { SocialLinksComponent } from '@shared/components/social-links/social-links.component';
import { ScrollRevealDirective } from '@shared/directives/scroll-reveal.directive';
import { APP_CONSTANTS } from '@core/constants/app.constants';
import { ContactFormService } from '@services/contact-form.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SectionHeaderComponent,
    SocialLinksComponent,
    ScrollRevealDirective
  ],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);
  private readonly contactService = inject(ContactFormService);

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);

  readonly email = APP_CONSTANTS.social.email;

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
  });

  // Simple honeypot for spam protection
  readonly honeypot = this.fb.control('');

  ngOnInit(): void {
    this.seo.updateMetaTags(ROUTE_SEO_CONFIG['/contact']);
  }

  async onSubmit(): Promise<void> {
    // Spam check: if honeypot is filled, silently reject
    if (this.honeypot.value) {
      this.submitted.set(true);
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    try {
      // Send to Google Sheets via ContactFormService
      const result = await firstValueFrom(
        this.contactService.send(this.contactForm.getRawValue())
      );

      if (result.success) {
        this.submitted.set(true);
        this.contactForm.reset();
      } else {
        this.error.set('Failed to send message. Please try again or email me directly.');
      }
    } catch {
      this.error.set('Failed to send message. Please try again or email me directly.');
    } finally {
      this.submitting.set(false);
    }
  }

  hasError(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  getError(field: string): string {
    const control = this.contactForm.get(field);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Please enter a valid email address';
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
    }
    return 'Invalid input';
  }
}
