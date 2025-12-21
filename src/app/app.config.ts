import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { appReducers, EffectsArray } from './app.reducers';
import { provideEffects } from '@ngrx/effects';

import { AuthInterceptor } from './Shared/Services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects(EffectsArray),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
