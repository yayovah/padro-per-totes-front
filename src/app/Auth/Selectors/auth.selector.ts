import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../Reducers/auth.reducer";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectCredentials = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.credentials
);

export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading
);

export const selectAuthLoaded = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loaded
);

