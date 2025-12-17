import { Action, createReducer, on } from '@ngrx/store';
import * as CiutatActions from '../Actions/ciutat.action';
import { CiutatDTO } from '../Models/ciutat.dto';

export interface CiutatsState {
    ciutats: CiutatDTO[];
    ciutat: CiutatDTO | null;
    error: any;
    loading: boolean;
    loaded: boolean;
}

export const initialState: CiutatsState = {
    ciutats: new Array<CiutatDTO>(),
    ciutat: null,
    error: null,
    loading: false,
    loaded: false,
};

const _ciutatReducer = createReducer(
    initialState,
    on(CiutatActions.getCiutats, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(CiutatActions.getCiutatsSuccess, (state, { ciutats }) => {
        console.log('REDUCER →', ciutats);
        return {
            ...state,
            ciutats: ciutats,
            loading: false,
            loaded: true,
            error: null
        };
    }),
    on(CiutatActions.getCiutatsFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    }))
);

export function ciutatsReducer(
  state: CiutatsState | undefined,
  action: Action
): CiutatsState {
  return _ciutatReducer(state, action);
}
