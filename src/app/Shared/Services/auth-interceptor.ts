import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../../Auth/Selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor{
  private store = inject(Store<AppState>);
  //private access_token = this.store.select(selectAuthToken);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
        console.log("PREPARANT CAPÇALERES 1");
    if (req.url.includes('/api/login')) {
        console.log('Interceptor: Ruta de login detectada, saltant...');
        return next.handle(req);
    }

    return this.store.select(selectAuthToken).pipe(
      take(1),
      switchMap((accessToken)=>{
        if(accessToken){
          req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            }
          })
        }
        console.log("PREPARANT CAPÇALERES 2");
        console.log(req);
        return next.handle(req);
      }),
    )
  }  
}
