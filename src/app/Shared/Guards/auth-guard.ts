import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
//import { AuthSelectors } from '../../Auth/Store/Selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
 /* const isAuthenticated = Store.selectSignal(AuthSelectors.isAuthenticated);
  if (!isAuthenticated()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }*/


  return true;
};
