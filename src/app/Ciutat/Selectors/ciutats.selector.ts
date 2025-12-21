import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CiutatsState } from "../Reducers/ciutat.reducer";

export const selectCiutatsFeature = createFeatureSelector<CiutatsState>('ciutats');

export const selectCiutats= createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.ciutats
);

export const selectCiutatsLoading = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.loading
);

export const selectCiutatsLoaded = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.loaded
);

export const selectCiutatsError = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.error
);

export const selectCiutatIdSeleccionada = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.idCiutatSeleccionada
);

export const selectCiutatAdmins = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.admins
);

export const selectCiutatAdminsLoading = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.loading
);  

export const selectCiutatAdminsLoaded = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.loaded
);

export const selectCiutatAdminsError = createSelector(
  selectCiutatsFeature,
  (state: CiutatsState) => state.error
);

