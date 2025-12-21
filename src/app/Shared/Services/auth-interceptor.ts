import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../../Auth/Selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor{
  private store = inject(Store<AppState>);
  private access_token = this.store.select(selectAuthToken);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    if(this.access_token){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${this.access_token}`,
        }
      })
    }
     return next.handle(req);
  }  
}
