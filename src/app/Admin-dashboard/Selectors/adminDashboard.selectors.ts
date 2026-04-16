import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminDashboardState } from "../Reducers/adminDashboard.reducer";

export const selectAdminDashboardFeature = createFeatureSelector<AdminDashboardState>('adminDashboard');

// PREGUNTES
export const selectPreguntes= createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.preguntes
);
export const selectPreguntesLoading = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);
export const selectPreguntesLoaded = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);
export const selectPreguntesError = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.error
);

// RESPOSTES
export const selectRespostes= createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.respostes
);
export const selectRespostesLoading = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);
export const selectRespostesLoaded = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);

export const selectRespostesError = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.error
);

// SITUACIONS
export const selectSituacions= createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.situacions
);
export const selectSituacionsLoading = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);
export const selectSituacionsLoaded = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.loading
);

export const selectSituacionsError = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.error
);

//PREGUNTA SELECCIONADA
export const selectPreguntaIdSeleccionada = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.idPreguntaSeleccionada
);

//SITUACIO SELECCIONADA
export const selectSituacioIdSeleccionada = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.idSituacioSeleccionada
);
