import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAuthRol } from '../../Auth/Selectors/auth.selector';
import { map, tap } from 'rxjs';
//import { AuthSelectors } from '../../Auth/Store/Selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const rolNecessari = route.data['rolNecessari'];

  return store.select(selectAuthRol).pipe(
    map((rol) => {
      console.log("usuari rol: ", );
      if (rol !== rolNecessari ) {
        const router = inject(Router);
        router.navigate(['/login']);
        return false;
      }
      return true;
      }
    )
  )
};
