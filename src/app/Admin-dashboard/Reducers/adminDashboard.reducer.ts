import { Action, createReducer, on } from '@ngrx/store';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { RespostaDTO } from '../../Respostes/Models/resposta.dto';
import { SituacioDTO } from '../../Situacions/Model/situacio.dto';

export interface AdminDashboardState {
    idCiutatSeleccionada: number | null;
    idPreguntaSeleccionada: number | null;
    idSituacioSeleccionada: number | null;
    preguntes: PreguntaDTO[];
    respostes: RespostaDTO[];   //Respostes a la pregunta seleccionada
    situacions: SituacioDTO[];   //Respostes a la pregunta seleccionada
    error: any;
    loading: boolean;
    loaded: boolean;
}
export const initialState:  AdminDashboardState = {
    idCiutatSeleccionada : null,
    idPreguntaSeleccionada: null, // Per saber quina llista de respostes mostrar
    idSituacioSeleccionada: null, // Per saber quina llista de respostes mostrar
    preguntes: new Array<PreguntaDTO>,       // Les preguntes de la ciutat seleccionada
    respostes: new Array<RespostaDTO>,     // Les respostes de la pregunta oberta
    situacions: new Array<SituacioDTO>,     // Les respostes de la pregunta oberta
    error: null,
    loading: false,
    loaded: false
}

const _adminDashboardReducer = createReducer(
    initialState,
    on(AdminDashboardActions.getPreguntes, (state, { ciutatId }) => ({
        ...state,
        idCiutatSeleccionada : ciutatId,
        error: null,
        loading: true,
        loaded: false
    })),

    on(AdminDashboardActions.getPreguntesSuccess, (state, { preguntes }) => ({
        ...state,
        preguntes: preguntes,
        error: null,
        loading: false,
        loaded: true
    })),

    on(AdminDashboardActions.getPreguntesFailure, (state, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),
    on(AdminDashboardActions.createPregunta, (state, { ciutatId }) => ({
        ...state,
        idCiutatSeleccionada : ciutatId,
        error: null,
        loading: true,
        loaded: false
    })),

    on(AdminDashboardActions.selectPregunta, (state, { preguntaId }) => ({
        ...state,
        idPreguntaSeleccionada: preguntaId,
    })),
    on(AdminDashboardActions.resetSelectPregunta, (state) => ({
        ...state,
        idPreguntaSeleccionada: null,
    })),


    on(AdminDashboardActions.createPreguntaSuccess, (state, { ciutatId }) => ({
        ...state,
        error: null,
        loading: false,
        loaded: true
    })),

    on(AdminDashboardActions.createPreguntaFailure, (state, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),

     on(AdminDashboardActions.getSituacions, (state, { ciutatId, preguntaId }) => ({
        ...state,
        //idCiutatSeleccionada : ciutatId,
        idPreguntaSeleccionada: preguntaId,
        error: null,
        loading: true,
        loaded: false
    })),

    on(AdminDashboardActions.getSituacionsSuccess, (state, { situacions }) => ({
        ...state,
        situacions: situacions,
        error: null,
        loading: false,
        loaded: true
    })),

    on(AdminDashboardActions.getSituacionsFailure, (state, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),

    on(AdminDashboardActions.selectSituacio, (state, { situacioId }) => ({
        ...state,
        idSituacioSeleccionada: situacioId,
    })),
    on(AdminDashboardActions.resetSituacioPregunta, (state) => ({
        ...state,
        idSituacioSeleccionada: null,
    })),

)

export function adminDashboardReducer(
    state: AdminDashboardState | undefined, 
    action: Action
): AdminDashboardState {
    return _adminDashboardReducer(state, action);
}