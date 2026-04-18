import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import { Pregunta } from '../../../../Preguntes/Services/pregunta';
import { Resposta } from '../../../../Respostes/Services/resposta';
import * as CiutatActions from '../../../../Ciutat/Actions/ciutat.action';
import { Situacio } from '../../../../Situacions/Services/situacio';

@Injectable()
export class AdminDashboardEffects {
    private actions$ = inject(Actions);
    private preguntaService = inject(Pregunta);
    private respostaService = inject(Resposta);
    private situacioService = inject(Situacio);

 /*   getPreguntes = createEffect(() =>
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
    )*/

    getPreguntes = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatActions.selectCiutat),     //Quan se selecciona una ciutat, es carreguen les preguntes
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

    getPreguntesSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getPreguntesSuccess)),
        { dispatch: false }
    )

    getPreguntesFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getPreguntesFailure),
            tap(({ payload }) => {
                console.log("Error al intentar cargar las preguntas", payload.error);
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

    getSituacions = createEffect(() =>
         this.actions$.pipe(ofType(AdminDashboardActions.getSituacions),
            exhaustMap(({ ciutatId, preguntaId }) =>
                this.situacioService.getSituacionsByPregunta( preguntaId).pipe(
                map((situacions) =>{
                    return AdminDashboardActions.getSituacionsSuccess({ situacions });
                }),
                catchError((error) =>
                    of(AdminDashboardActions.getPreguntesFailure({ payload: error }))       
                )
            )
        )
    ))
    getSituacionsSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getSituacionsSuccess)),
        { dispatch: false }
    )
    getSituacionsFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.getSituacionsFailure),
            tap(({ payload }) => {
                console.log("Error al intentar cargar las situaciones", payload.error);
            })
        ),
        { dispatch: false }
    )

    //SITUACIONS

    createSituacio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminDashboardActions.createSituacio),
            exhaustMap(({ dadesSituacio, resposta }) =>
                this.situacioService.createSituacio(dadesSituacio, resposta).pipe(
                    map((respostaBD) =>{
                        return AdminDashboardActions.createSituacioSuccess({
                            dadesSituacio: respostaBD.situacio, 
                            resposta: respostaBD.resposta
                        });
                    }),
                    catchError((error) =>
                        of(AdminDashboardActions.createSituacioFailure({ payload: error }))       
                    )
                )
            )
        )
    )
    
    createSituacioSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.createSituacioSuccess),
        map((resposta) =>
            AdminDashboardActions.getSituacions({
                ciutatId: resposta.dadesSituacio.ciutatId, 
                preguntaId: resposta.dadesSituacio.preguntaId
            }))
        ),
    )

    createSituacioFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(AdminDashboardActions.createSituacioFailure),),
        { dispatch: false }
    )
}