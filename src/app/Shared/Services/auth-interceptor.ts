import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Auth } from '../../Auth/Services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor{
  private authService = inject(Auth);
  private accessToken = computed(() => this.authService.credentials()?.token ?? null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Llistat de rutes públiques de la API, on no es requereix token:
    const publicRoutes = [
      '/api/login',
    ];
    // Saltem l'interceptor per la petició a les rutes públiuqes
    if (publicRoutes.some(route => req.url.includes(route))) {
        return next.handle(req);
    }

    // Afegim el token, si el tenim, a les peticions cap a la API
    if(this.accessToken()){
      req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.accessToken()}`,
        }
      })
    }
    return next.handle(req);

  }  
}
