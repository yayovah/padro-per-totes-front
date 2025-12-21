import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../Model/auth.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { LlistableDTO } from '../../Shared/Models/llistable.dto';


// Auth Actions

/**
 * Inicia el procés d'autenticació de l'usuari.
 * @param credentials Objecte amb email i password.
 * @trigger AuthEffects.login$
 */
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: AuthDTO }>()
);

/**
 * Autenticació de l'usuari exitosa.
 * @param credentials Objecte amb email i password.
 * @trigger AuthEffects.loginSuccess$
 */
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ credentials: AuthDTO }>()
);

/**
 * Autenticació de l'usuari fallida.
 * @param payload Objecte amb l'error de la petició.
 * @trigger AuthEffects.loginFailure$
 */
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

/* export const getUsersByRol = createAction(
  '[Ciutat] Get Users By Rol',
  props<{ rol: string }>()
);

export const getUsersByRolSuccess = createAction(
  '[Ciutat] Get Users By Rol Success',
  props<{ users: any[] }>()
);

export const getUsersByRolFailure = createAction(
  '[Ciutat] Get Users By Rol Failure',
  props<{ payload: HttpErrorResponse }>()
); */