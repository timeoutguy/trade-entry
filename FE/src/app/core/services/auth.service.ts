import { Inject, Injectable, Optional, signal } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly enabled = environment.auth.enabled;
  readonly accountName = signal<string | null>(null);

  constructor(
    @Optional() private readonly msal: MsalService | null,
    @Optional() @Inject(MSAL_GUARD_CONFIG) private readonly guardConfig: MsalGuardConfiguration | null
  ) {}

  refreshAccount(): void {
    if (!this.enabled || !this.msal) {
      this.accountName.set(null);
      return;
    }

    const account =
      this.msal.instance.getActiveAccount() ?? this.msal.instance.getAllAccounts()[0] ?? null;
    this.accountName.set(account?.name ?? account?.username ?? null);
  }

  isAuthenticated(): boolean {
    if (!this.enabled) {
      return true;
    }

    return (this.msal?.instance.getAllAccounts().length ?? 0) > 0;
  }

  login(): void {
    if (!this.enabled || !this.msal) {
      return;
    }

    const request = this.guardConfig?.authRequest as RedirectRequest | undefined;
    this.msal.loginRedirect(request ?? { scopes: environment.auth.scopes }).subscribe();
  }

  logout(): void {
    if (!this.enabled || !this.msal) {
      return;
    }

    this.msal
      .logoutRedirect({
        postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
      })
      .subscribe();
  }
}
