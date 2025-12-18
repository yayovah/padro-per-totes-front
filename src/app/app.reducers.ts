import { ActionReducerMap } from '@ngrx/store';
import * as CiutatsReducer from './Ciutat/Reducers/ciutat.reducer';
import { CiutatsEffects } from './Ciutat/Effects/ciutat.effects';
import { AuthEffects } from './Auth/Effects/auth.effect';
import * as authReducer  from './Auth/Reducers/auth.reducer';

export interface AppState {
  ciutats: CiutatsReducer.CiutatsState,
  auth: authReducer.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ciutats: CiutatsReducer.ciutatsReducer,
  auth: authReducer.authReducer
};

export const EffectsArray: any[] = [
    CiutatsEffects,
    AuthEffects
];