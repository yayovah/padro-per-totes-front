import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PreguntaDTO } from '../../../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../../../Situacions/Model/situacio.dto';
import { SituacioToBDDTO } from '../../../../Situacions/Model/situacioToBD.dto';
import { RespostaDTO } from '../../../../Respostes/Models/resposta.dto';

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
  '[AdminDashboard] Crea Preguntes Success',
  props<{ ciutatId : number }>()
);
export const createPreguntaFailure = createAction(
  '[AdminDashboard] Crea Preguntes Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const updatePregunta = createAction(
  '[AdminDashboard] Update Pregunta',
  props<{ dadesPregunta: PreguntaDTO }>()
);
export const updatePreguntaSuccess = createAction(
  '[AdminDashboard] Update Pregunta Success',
  props<{ Pregunta: PreguntaDTO }>()
);
export const updatePreguntaFailure = createAction(
  '[AdminDashboard] Update Pregunta Failure',
    props<{ payload: HttpErrorResponse }>()
);

export const selectPregunta = createAction(
  '[AdminDashboard] Select Pregunta',
  props<{ preguntaId : number }>()
);
export const resetSelectPregunta = createAction(
  '[AdminDashboard] Reset Preguntes Failure'
);

//situacions
export const getSituacions = createAction(
  '[AdminDashboard] Get Situacions',
  props<{ ciutatId : number, preguntaId: number }>()
);
export const getSituacionsSuccess = createAction(
  '[AdminDashboard] Get Situacions Success',
  props<{ situacions : SituacioDTO[] }>()
);
export const getSituacionsFailure = createAction(
  '[AdminDashboard] Get Situacions Failure',
    props<{ payload: HttpErrorResponse }>()
);
export const selectSituacio = createAction(
  '[AdminDashboard] Select Situacio',
  props<{ situacioId : number }>()
);
export const resetSituacioPregunta = createAction(
  '[AdminDashboard] Reset Situacio Failure'
);

//RESPOSTES (SITUACIONS)

export const createSituacio = createAction(
  '[AdminDashboard] Create Situacio',
  props<{dadesSituacio: Omit<SituacioToBDDTO, 'id'>, resposta: string}>()
);

export const createSituacioSuccess = createAction(
  '[AdminDashboard] Create Situacio Success',
  props<{dadesSituacio: SituacioToBDDTO, resposta: RespostaDTO}>()
);
export const createSituacioFailure = createAction(
  '[AdminDashboard] Create Situacio Failure',
  props<{ payload: HttpErrorResponse}>()
);


export const updateSituacio = createAction(
  '[Ciutat] update Ciutat data',
  props<{ dadesSituacio: SituacioToBDDTO }>()
);

export const updateSituacioSuccess = createAction(
  '[Ciutat] Update Ciutat Success',
  props<{ situacio: SituacioToBDDTO }>()
)

export const updateSituacioFailure = createAction(
  '[Ciutat] Update Ciutat Failure',
  props<{ payload: HttpErrorResponse}>()
);



export const deleteSituacio = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ situacioId: number }>()
);
export const deleteSituacioSuccess = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ situacioId: number }>()
);
export const deleteSituacioFailure = createAction(
  '[Ciutat] Delete Ciutat',
  props<{ payload: HttpErrorResponse }>()
);
