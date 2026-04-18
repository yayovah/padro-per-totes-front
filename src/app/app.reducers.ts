import { ActionReducerMap } from '@ngrx/store';
import * as CiutatsReducer from './Ciutat/Reducers/ciutat.reducer';
import { CiutatsEffects } from './Ciutat/Effects/ciutat.effects';
import { AuthEffects } from './Auth/Effects/auth.effect';
import * as authReducer  from './Auth/Reducers/auth.reducer';
import * as adminDashboardReducer from './Home/Components/Admin-dashboard/Reducers/adminDashboard.reducer'
import { AdminDashboardEffects } from './Home/Components/Admin-dashboard/Effects/adminDashboard.effect';

export interface AppState {
  ciutats: CiutatsReducer.CiutatsState,
  auth: authReducer.AuthState,
  adminDashboard: adminDashboardReducer.AdminDashboardState
}

export const appReducers: ActionReducerMap<AppState> = {
  ciutats: CiutatsReducer.ciutatsReducer,
  auth: authReducer.authReducer,
  adminDashboard: adminDashboardReducer.adminDashboardReducer
};

export const EffectsArray: any[] = [
    CiutatsEffects,
    AuthEffects,
    AdminDashboardEffects
];