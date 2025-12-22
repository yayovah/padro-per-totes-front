import { Action, createReducer, on } from '@ngrx/store';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { RespostaDTO } from '../../Respostes/Models/resposta.dto';


export interface AdminDashboardState {
    idCiutatSeleccionada: number | null;
    idPreguntaSeleccionada: number | null;
    preguntes: PreguntaDTO[];
    respostes: RespostaDTO[];   //Respostes a la pregunta seleccionada
    error: any;
    loading: boolean;
    loaded: boolean;
}
export const initialState:  AdminDashboardState = {
    idCiutatSeleccionada : null,
    idPreguntaSeleccionada: null, // Per saber quina llista de respostes mostrar
    preguntes: new Array<PreguntaDTO>,       // Les preguntes de la ciutat seleccionada
    respostes: new Array<RespostaDTO>,     // Les respostes de la pregunta oberta
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
)