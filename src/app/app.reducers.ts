import { ActionReducerMap } from '@ngrx/store';
import * as CiutatsReducer from './Ciutat/Reducers/ciutat.reducer';
import { CiutatsEffects } from './Ciutat/Effects/ciutat.effects';

export interface AppState {
  ciutats: CiutatsReducer.CiutatsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ciutats: CiutatsReducer.ciutatsReducer
};

export const EffectsArray: any[] = [
    CiutatsEffects,
];