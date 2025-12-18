import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "../Services/auth";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap } from "rxjs";
import * as AuthActions from '../Actions/auth.action';

@Injectable()
export class AuthEffects {
    private responseOK = false;
    private errorResponse: any = null;
    private actions$ = inject(Actions);

    constructor(
        private authService: Auth,
        private router: Router,
    ) {}

    login$ = createEffect(() => {
        console.log('AuthEffects login$ effect initialized');
        return this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ credentials }) => 
                this.authService.login(credentials).pipe(
                map((userToken) => {
                    console.log('Effect LOGIN userToken →', userToken);
                    const auth = {
                        user_id: userToken.user_id,
                        access_token: userToken.access_token,
                        email: credentials.email,
                        password: credentials.password
                    }

                    return AuthActions.loginSuccess({ credentials: auth })
                }),
                catchError((error) => {
                    console.error('Effect Error:', error);
                    return [AuthActions.loginFailure({ payload: error })];
                })
                )
            )
        )}
    );      

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            switchMap(() => {
                this.router.navigate(['/ciutats']);
                return [];
            })
        ),
    { dispatch: false }
    );

    loginFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginFailure),
            switchMap(({ payload }) => {
                console.error('Login failed with error:', payload);
                this.router.navigate(['/']);
                // Aquí podríem afegir més lògica, com mostrar un missatge d'error a l'usuari
                return [];
            })
        ),
    { dispatch: false }
    );
}