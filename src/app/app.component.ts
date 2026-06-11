import { Component, DestroyRef, inject, OnInit, Optional } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  constructor(
    @Optional() private readonly msal: MsalService | null,
    @Optional() private readonly msalBroadcast: MsalBroadcastService | null
  ) {}

  ngOnInit(): void {
    if (!environment.auth.enabled || !this.msal || !this.msalBroadcast) {
      return;
    }

    this.msal.handleRedirectObservable().subscribe(() => {
      this.setActiveAccount();
      this.authService.refreshAccount();
    });

    this.msalBroadcast.msalSubject$
      .pipe(
        filter(
          (message: EventMessage) =>
            message.eventType === EventType.LOGIN_SUCCESS ||
            message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.setActiveAccount();
        this.authService.refreshAccount();
      });

    this.msalBroadcast.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.setActiveAccount();
        this.authService.refreshAccount();
      });
  }

  private setActiveAccount(): void {
    if (!this.msal) {
      return;
    }

    const activeAccount = this.msal.instance.getActiveAccount();
    if (activeAccount) {
      return;
    }

    const [firstAccount] = this.msal.instance.getAllAccounts();
    if (firstAccount) {
      this.msal.instance.setActiveAccount(firstAccount);
    }
  }
}
