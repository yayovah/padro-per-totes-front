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

export const selectCiutat = createAction(
  '[Ciutat] Select Ciutat',
  props<{ ciutatId: number }>()
);

export const resetSelectCiutat = createAction(
  '[Ciutat] Reset Select Ciutat'
);

resetSelectCiutat

export const getCiutatAdmins = createAction(
  '[Ciutat] Get Ciutat Admins',
  props<{ ciutatId: number }>()
);

export const getCiutatAdminsSuccess = createAction(
  '[Ciutat] Get Ciutat Admins Success',
  props<{ admins: any[] }>()
);

export const getCiutatAdminsFailure = createAction(
  '[Ciutat] Get Ciutat Admins Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateCiutat = createAction(
  '[Ciutat] update Ciutat data',
  props<{ dadesCiutat: CiutatDTO }>()
);

export const updateCiutatSuccess = createAction(
  '[Ciutat] Update Ciutat Success',
  props<{ ciutat: CiutatDTO }>()
)

export const updateCiutatFailure = createAction(
  '[Ciutat] Update Ciutat Failure',
  props<{ payload: HttpErrorResponse}>()
);


export const createCiutat = createAction(
  '[Ciutat] Create Ciutat',
  props<{dadesCiutat: Omit<CiutatDTO, 'id'>}>()
);

export const createCiutatSuccess = createAction(
  '[Ciutat] Create Ciutat Success',
  props<{dadesCiutat: Omit<CiutatDTO, 'id'>}>()
);
export const createCiutatFailure = createAction(
  '[Ciutat] Create Ciutat Failure',
  props<{ payload: HttpErrorResponse}>()
);


export const deleteCiutat = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ ciutatId: number }>()
);
export const deleteCiutatSuccess = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ ciutatId: number }>()
);
export const deleteCiutatFailure = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ payload: HttpErrorResponse }>()
);
