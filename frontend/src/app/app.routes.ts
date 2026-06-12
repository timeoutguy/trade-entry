import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'redirect',
    loadComponent: () =>
      import('./features/auth/redirect/redirect.component').then((m) => m.RedirectComponent),
  },
  {
    path: 'login-failed',
    loadComponent: () =>
      import('./features/auth/login-failed/login-failed.component').then(
        (m) => m.LoginFailedComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/trade-entry/trade-entry.page').then((m) => m.TradeEntryPage),
  },
  { path: '**', redirectTo: '' },
];
