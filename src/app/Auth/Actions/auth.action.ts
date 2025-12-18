import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../Model/auth.dto';
import { HttpErrorResponse } from '@angular/common/http';


// Auth Actions

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: AuthDTO }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ credentials: AuthDTO }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

