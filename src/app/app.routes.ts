import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/trade-entry/trade-entry.page').then((m) => m.TradeEntryPage),
  },
  { path: '**', redirectTo: '' },
];
