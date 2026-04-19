import { ActionReducerMap } from '@ngrx/store';
import * as CiutatsReducer from './Ciutat/Reducers/ciutat.reducer';
import { CiutatsEffects } from './Ciutat/Effects/ciutat.effects';
import * as adminDashboardReducer from './Home/Components/Admin-dashboard/Reducers/adminDashboard.reducer'
import { AdminDashboardEffects } from './Home/Components/Admin-dashboard/Effects/adminDashboard.effect';

export interface AppState {
  ciutats: CiutatsReducer.CiutatsState,
  adminDashboard: adminDashboardReducer.AdminDashboardState
}

export const appReducers: ActionReducerMap<AppState> = {
  ciutats: CiutatsReducer.ciutatsReducer,
  adminDashboard: adminDashboardReducer.adminDashboardReducer
};

export const EffectsArray: any[] = [
    CiutatsEffects,
    AdminDashboardEffects
];