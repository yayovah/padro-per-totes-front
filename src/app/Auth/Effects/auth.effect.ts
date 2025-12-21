import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "../Services/auth";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from '../Actions/auth.action';
import { AppState } from "../../app.reducers";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffects {
    private responseOK = false;
    private errorResponse: any = null;
    private actions$ = inject(Actions);
    private store = inject(Store<AppState>);

    constructor(
        private authService: Auth,
        private router: Router,
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ credentials }) => 
                this.authService.login(credentials).pipe(
                map((apiResponse: any) => {
                    console.log(apiResponse);
                    const auth = {
                        user_id: apiResponse.user.id,
                        access_token: apiResponse.token,
                        rol: apiResponse.user.rol,
                        email: credentials.email,
                        password: credentials.password,
                    };
                    console.log(auth);
                    return AuthActions.loginSuccess({ credentials: auth });
                }),
                catchError((error) => {
                    console.error('Effect Error:', error);
                    return [AuthActions.loginFailure({ payload: error })];
                })
                )
            )
        )}
    );      

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ credentials }) => {
                switch(credentials.rol){
                    case 'usuari':
                        this.router.navigate(['/userDash']);
                        break;
                    case 'admin':
                        this.router.navigate(['/adminDash']);
                        break;
                    case 'superadmin':
                        this.router.navigate(['/superadminDash']);
                        break;
                    default:
                        this.router.navigate(['/userDash']);
                        break;
                }
             }
            ))},
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