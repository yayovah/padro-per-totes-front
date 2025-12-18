import { Action, createReducer, on } from "@ngrx/store";
import { AuthDTO } from "../Model/auth.dto";
import * as AuthActions from '../Actions/auth.action';

export interface AuthState {
    credentials: AuthDTO | null;
    error: any;
    loading: boolean;
    loaded: boolean;
}

export const initialState: AuthState = {
    credentials: null,
    error: null,
    loading: false,
    loaded: false,
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({ 
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { credentials }) => {
        return {
            ...state,
            credentials: credentials,
            loading: false,
            loaded: true,
            error: null
        };
    }),
    on(AuthActions.loginFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    }))
);  
export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}

