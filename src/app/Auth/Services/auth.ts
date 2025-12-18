import { Injectable } from '@angular/core';
import { AuthDTO } from '../Model/auth.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthToken } from '../Model/authToken.dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly baseUrl = environment.apiUrl;

  private readonly ciutatsEndpoint = '/login';
  private readonly url = `${this.baseUrl}${this.ciutatsEndpoint}`;

constructor(private http: HttpClient) {}
  /**
   * Intentar login a la API
   * 
   * @returns AuthToken : token d'autenticació des de la API
   * @throws Error en cas d'error en la petició
   *  
   */
  login(auth: AuthDTO): Observable<AuthToken> {
    console.log('Auth Service login called with:', auth);
    return this.http
      .post<AuthToken>(this.url, auth)
      .pipe(catchError((error) => {
        console.error('Error during login:', error);
        throw new Error('Error during login');
      }));
  }

}
