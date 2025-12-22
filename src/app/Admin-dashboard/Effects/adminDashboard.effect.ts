import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import { Pregunta } from '../../Preguntes/Services/pregunta';
import { Resposta } from '../../Respostes/Services/resposta';


@Injectable()
export class AdminDashboardEffects {
    private actions$ = inject(Actions);
    private preguntaService = inject(Pregunta);
    private respostaService = inject(Resposta);

    getPreguntes = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminDashboardActions.getPreguntes),
            exhaustMap(({ ciutatId }) =>
                this.preguntaService.getPreguntesByCiutat( ciutatId ).pipe(
                    map((preguntes) =>{
                        return AdminDashboardActions.getPreguntesSuccess({ preguntes });
                    }),
                    catchError((error) =>
                        of(AdminDashboardActions.getPreguntesFailure({ payload: error }))       
                    )
                )
            )
        )
    )

    getCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getPreguntesSuccess)),
        { dispatch: false }
    )
    getCiutatFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getPreguntesFailure),
            tap(({ payload }) => {
                console.log("Error al intentar cargar las ciudades", payload.error);
            })
        ),
        { dispatch: false }
    )
    createPregunta = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminDashboardActions.createPregunta),
            exhaustMap(({ dadesPregunta, ciutatId }) =>
                this.preguntaService.createPregunta( dadesPregunta, ciutatId ).pipe(
                    map(() =>{
                        return AdminDashboardActions.createPreguntaSuccess({ ciutatId });
                    }),
                    catchError((error) =>
                        of(AdminDashboardActions.createPreguntaFailure({ payload: error }))       
                    )
                )
            )
        )
    )

    createPreguntaSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.createPreguntaSuccess),
        map((ciutatId) =>AdminDashboardActions.getPreguntes( ciutatId ))),
    )
    createPreguntaFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.createPreguntaFailure),
            tap(({ payload }) => {
                console.log("Error al intentar crear la pregunta", payload.error);
            })
        ),
        { dispatch: false }
    )

}