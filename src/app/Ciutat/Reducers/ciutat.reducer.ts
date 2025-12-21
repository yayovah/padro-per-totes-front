import { Action, createReducer, on } from '@ngrx/store';
import * as CiutatActions from '../Actions/ciutat.action';
import { CiutatDTO } from '../Models/ciutat.dto';
import { UserDTO } from '../../Shared/Models/user.dto';

export interface CiutatsState {
    ciutats: CiutatDTO[];                   //Llistat de ciutats
    idCiutatSeleccionada: number | null;    //Ciutat seleccionada
    admins: UserDTO[];                      //Admins de la ciutat seleccionada
    error: any;
    loading: boolean;
    loaded: boolean;
}

export const initialState: CiutatsState = {
    ciutats: new Array<CiutatDTO>(),
    idCiutatSeleccionada: null,
    admins: new Array<UserDTO>(),
    error: null,
    loading: false,
    loaded: false,
};

const _ciutatReducer = createReducer(
    initialState,
    on(CiutatActions.getCiutats, (state) => ({
        ...state,
        idCiutatSeleccionada: null,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(CiutatActions.getCiutatsSuccess, (state, { ciutats }) => ({
        ...state,
        ciutats: ciutats,
        loading: false,
        loaded: true,
        error: null
    })),
    on(CiutatActions.getCiutatsFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),
    on(CiutatActions.selectCiutat, (state, { ciutatId }) => ({
        ...state,
        idCiutatSeleccionada: ciutatId,
    })),
    on(CiutatActions.resetSelectCiutat, (state) => ({
        ...state,
        idCiutatSeleccionada: null,
    })),
    
    on(CiutatActions.getCiutatAdmins, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),    

    on(CiutatActions.getCiutatAdminsSuccess, (state, { admins }) => ({
        ...state,
        admins: admins,
        loading: false,
        loaded: true,
        error: null
    })),

    on(CiutatActions.getCiutatAdminsFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    on(CiutatActions.updateCiutat, (state, { dadesCiutat }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),

    on(CiutatActions.updateCiutatSuccess, (state) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null
    })),

    on(CiutatActions.updateCiutatFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),
    
    on(CiutatActions.deleteCiutat, (state, { ciutatId }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),

    on(CiutatActions.deleteCiutatSuccess, (state, { ciutatId }) => ({
        ...state,
        ciutats: [...state.ciutats.filter((ciutat) => ciutat.id !== ciutatId)], //Treiem la ciutat eliminada (abans de tornar a demanar a la API que ens les envii)
        loading: true,
        loaded: false,
        error: null,
    })),


    on(CiutatActions.deleteCiutatFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),
    
    
);

export function ciutatsReducer(
  state: CiutatsState | undefined,
  action: Action
): CiutatsState {
  return _ciutatReducer(state, action);
}
