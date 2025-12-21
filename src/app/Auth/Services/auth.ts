import { Injectable } from '@angular/core';
import { AuthDTO } from '../Model/auth.dto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthToken } from '../Model/authToken.dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly baseUrl = environment.apiUrl;

  private readonly loginEndpoint = '/login';
  private readonly loginUrl = `${this.baseUrl}${this.loginEndpoint}`;
  private readonly usersEndpoint = '/users';
  private readonly url = `${this.baseUrl}${this.usersEndpoint}`;
  

constructor(private http: HttpClient) {}
  /**
   * Intentar login a la API
   * 
   * @returns AuthToken : token d'autenticació des de la API
   * @throws Error en cas d'error en la petició
   *  
   */
  login(auth: AuthDTO): Observable<AuthDTO> {
    return this.http
      .post<AuthDTO>(this.loginUrl, auth)
      .pipe(catchError((error) => {
        throw new Error('Error during login');
      }));
  }

  getUsersByRol(rol: string): Observable<AuthDTO[]> {
    return this.http
      .get<any[]>(`${this.url}/${rol}`)
      .pipe(
        catchError((error) => {
          console.error(`Error recuperando administradores des del servidor:`, error);
          return throwError(() => new Error('Error recuperando listado de admins'));
        }
      ));
  }

}
