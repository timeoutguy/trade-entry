import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-failed',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `
    <div class="mx-auto max-w-lg px-6 py-16 text-center">
      <h1 class="text-xl font-semibold text-cfp-text">Sign-in failed</h1>
      <p class="mt-2 text-sm text-cfp-text-muted">
        We could not complete Microsoft sign-in. Try again or contact your administrator.
      </p>
      <a mat-flat-button class="cfp-btn-dark mt-6" routerLink="/">Back to trade entry</a>
    </div>
  `,
})
export class LoginFailedComponent {}
