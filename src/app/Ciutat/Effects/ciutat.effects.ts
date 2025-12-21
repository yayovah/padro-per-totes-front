import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { Ciutats } from '../Services/ciutats';
import * as CiutatsActions from '../Actions/ciutat.action';

@Injectable()
export class CiutatsEffects {
    private responseOK = false;
    private errorResponse: any = null;
    private actions$ = inject(Actions);

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
}

