import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminDashboardState } from "../Reducers/adminDashboard.reducer";

export const selectAdminDashboardFeature = createFeatureSelector<AdminDashboardState>('adminDashboard');

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

export const selectPreguntaIdSeleccionada = createSelector(
  selectAdminDashboardFeature,
  (state: AdminDashboardState) => state.idPreguntaSeleccionada
);
