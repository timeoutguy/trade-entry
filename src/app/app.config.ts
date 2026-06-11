import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getMsalProviders } from './core/config/msal.config';
import { APP_DATE_FORMATS } from './shared/adapters/date-formats';
import { IsoDateAdapter } from './shared/adapters/iso-date.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    ...getMsalProviders(),
    { provide: DateAdapter, useClass: IsoDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
};
