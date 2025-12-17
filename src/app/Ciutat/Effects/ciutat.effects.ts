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
                    console.log('CIUTATS API →', ciutats);
                    //CiutatsActions.getCiutatsSuccess({ ciutats });
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
}

