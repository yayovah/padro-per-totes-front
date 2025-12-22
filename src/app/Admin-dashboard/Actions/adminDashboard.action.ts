import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';

export const getPreguntes = createAction(
  '[AdminDashboard] Get Preguntes',
  props<{ ciutatId : number }>()
);
export const getPreguntesSuccess = createAction(
  '[AdminDashboard] Get Preguntes Success',
  props<{ preguntes : PreguntaDTO[] }>()
);
export const getPreguntesFailure = createAction(
  '[AdminDashboard] Get Preguntes Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const createPregunta = createAction(
  '[AdminDashboard] Crea Pregunta',
  props<{ dadesPregunta: any, ciutatId : number }>()
);
export const createPreguntaSuccess = createAction(
  '[AdminDashboard] Get Preguntes Success',
  props<{ ciutatId : number }>()
);
export const createPreguntaFailure = createAction(
  '[AdminDashboard] Get Preguntes Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const selectPregunta = createAction(
  '[AdminDashboard] Select Pregunta',
  props<{ preguntaId : number }>()
);
export const resetSelectPregunta = createAction(
  '[AdminDashboard] Reset Preguntes Failure'
);