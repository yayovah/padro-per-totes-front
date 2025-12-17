import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CiutatDTO } from '../Models/ciutat.dto';

//Ciutats Actions

export const getCiutats = createAction(
  '[Ciutat] Get Ciutats'
);

export const getCiutatsSuccess = createAction(
  '[Ciutat] Get Ciutats Success',
  props<{ ciutats: CiutatDTO[] }>()
);

export const getCiutatsFailure = createAction(
  '[Ciutat] Get Ciutats Failure',
  props<{ payload: HttpErrorResponse }>()
);
