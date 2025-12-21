import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { Ciutats } from '../Services/ciutats';
import * as CiutatsActions from '../Actions/ciutat.action';
import { Permis } from '../Services/permis';

@Injectable()
export class CiutatsEffects {
    private responseOK = false;
    private errorResponse: any = null;
    private actions$ = inject(Actions);
    private PermisService = inject(Permis);

    constructor(
        private ciutatsService: Ciutats,
        private router: Router,
    ) {}

    getCiutats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.getCiutats),
            exhaustMap(() =>
                this.ciutatsService.getCiutats().pipe(
                map((ciutats) => {
                    return CiutatsActions.getCiutatsSuccess({ ciutats });
                }
                ),
                catchError((error) =>
                    of(CiutatsActions.getCiutatsFailure({ payload: error }))
                )
                )
            )
        )
    );     

    getCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(CiutatsActions.getCiutatsSuccess)),
        { dispatch: false }
    )
    getCiutatFailure$ = createEffect(() =>
        this.actions$.pipe(ofType(CiutatsActions.getCiutatsFailure),
            tap(({ payload }) => {
                console.log("Error al intentar cargar las ciudades", payload.error);
            })
        ),
        { dispatch: false }
    )
    
    getCiutatAdmins$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.getCiutatAdmins),
            exhaustMap((action) =>
                this.ciutatsService.getAdminsCiutat(action.ciutatId).pipe(
                map((admins) => {
                    return CiutatsActions.getCiutatAdminsSuccess({ admins });
                }
                ),
                catchError((error) =>
                    of(CiutatsActions.getCiutatAdminsFailure({ payload: error }))       
                )
                )
            )
        )
    );

    updateCiutat$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CiutatsActions.updateCiutat),
            exhaustMap(({ dadesCiutat }) =>
                this.ciutatsService.updateCiutat(dadesCiutat).pipe(
                    map((updatedCiutat) =>{
                        return CiutatsActions.updateCiutatSuccess({
                            ciutat: updatedCiutat
                        });
                    }),
                    catchError((error) =>
                        of(CiutatsActions.updateCiutatFailure({ payload: error }))       
                    )
                )
            )
        )
    )

    updateCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.updateCiutatSuccess),
            map(() =>CiutatsActions.getCiutats())
        ),
    )

    createCiutat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.createCiutat),
            exhaustMap(({ dadesCiutat }) =>
                this.ciutatsService.createCiutat(dadesCiutat).pipe(
                    map((ciutatCreada) =>{
                        return CiutatsActions.createCiutatSuccess({
                            dadesCiutat: ciutatCreada
                        });
                    }),
                    catchError((error) =>
                        of(CiutatsActions.updateCiutatFailure({ payload: error }))       
                    )
                )
            )
        )
    )

    createCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.createCiutatSuccess),
                map(() =>CiutatsActions.getCiutats())
        ),
    )


    deleteCiutat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.deleteCiutat),
            exhaustMap(({ ciutatId }) =>
                this.ciutatsService.deleteCiutat(ciutatId).pipe(
                    map((ciutatId) =>  {
                    return CiutatsActions.deleteCiutatSuccess({
                        ciutatId: ciutatId
                    });
                }),
                catchError((error) =>
                    of(CiutatsActions.deleteCiutatFailure({ payload: error}))
                ))
            )
        )
    )

    deleteCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.deleteCiutatSuccess),
            map(() =>CiutatsActions.getCiutats())
        ),
    )

    
    addAdminToCiutat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.addAdminToCiutat),
            exhaustMap(({ ciutatId, adminId }) =>
                this.PermisService.createPermis( ciutatId, adminId ).pipe(
                    map((nouPermis) =>{
                        return CiutatsActions.addAdminToCiutatSuccess({
                            ciutatId: nouPermis.ciutat,
                            adminId: nouPermis.user
                        });
                    }),
                    catchError((error) =>
                        of(CiutatsActions.addAdminToCiutatFailure({ payload: error }))       
                    )
                )
            )
        )
    )
    addAdminToCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.addAdminToCiutatSuccess),
                map((nouPermis) =>CiutatsActions.getCiutatAdmins({ ciutatId: nouPermis.ciutatId }))
        ),
    )
    addAdminToCiutatFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.addAdminToCiutatFailure),
            tap(({ payload }) => {
                console.log("Error al intentar añadir admin a Ciutat", payload.error);
            })
        ),
        { dispatch: false }
    )
    deleteAdminFromCiutat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.deleteAdminFromCiutat),
            exhaustMap(({ ciutatId, adminId }) =>
                
                this.ciutatsService.deletePermis( ciutatId, adminId ).pipe(
                    map((nouPermis) =>{
                        return CiutatsActions.deleteAdminFromCiutatSuccess({
                            ciutatId: ciutatId,
                            adminId: nouPermis.id
                        });
                    }),
                    tap(() => console.log("AQUI A L'EFFECT!")),
                    catchError((error) =>
                        of(CiutatsActions.addAdminToCiutatFailure({ payload: error }))       
                    )
                )
            )
        )
    )
    deleteAdminFromCiutatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.deleteAdminFromCiutatSuccess),
                map((nouPermis) =>CiutatsActions.getCiutatAdmins({ ciutatId: nouPermis.ciutatId }))
        ),
    )
    deleteAdminFromCiutatFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CiutatsActions.deleteAdminFromCiutatFailure),
            tap(({ payload }) => {
                console.log("Error al intentar añadir admin a Ciutat", payload.error);
            })
        ),
        { dispatch: false }
    )
    
}

