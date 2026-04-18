import { inject, Injectable, signal } from '@angular/core';
import { AuthDTO, UserDTO } from '../Model/auth.dto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Endpoints
  private readonly baseUrl = environment.apiUrl;
  private readonly loginEndpoint = '/login';
  private readonly loginUrl = `${this.baseUrl}${this.loginEndpoint}`;
  private readonly usersEndpoint = '/users';
  private readonly url = `${this.baseUrl}${this.usersEndpoint}`;

  //Injecció de serveis
  private router = inject(Router);
  private storage = inject(Storage);

  //Signals
  private credentials = signal<AuthDTO | null>(null);
  

constructor(private http: HttpClient) {}
  /**
   * Intentar login a la API
   * 
   * @returns AuthToken : token d'autenticació des de la API
   * @throws Error en cas d'error en la petició
   *  
   */
  login(auth: UserDTO): void {
    this.http
      .post<AuthDTO>(this.loginUrl, auth)
      .pipe(
        tap( credentials => {
          this.credentials.set(credentials);
          this.storageCredentials();
          this.navegateByRol();
        }),
        
        catchError((error) => {
          //Mostrar un modal, quan estigui el servei fet
          throw new Error('Error haciendo login: ' + error.message);
      }))
      .subscribe();
  }

  //Demana el rol de l'usuari a la API
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

  //Guardea les credencials a l'storage
  storageCredentials(): void {
    //Guardem les credencials essencials a l'storage
    //Si no existeix alguna credencials es guarda com a cadena buida '' (storage guarda strings)
    this.storage.setItem('authToken', this.credentials()?.access_token || '');
    this.storage.setItem('userRol', this.credentials()?.user.rol || '');
    this.storage.setItem('userId', this.credentials()?.user.user_id?.toString() || '');
  }

  //Esborra les credencials a l'storage
  resetCredentials(): void {
    this.credentials.set(null);
    this.storage.removeItem('authToken');
    this.storage.removeItem('userRol');
    this.storage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  //Porta a la pàgina d'inici segons el rol de l'usuari
  navegateByRol(): void {
    switch(this.credentials()?.user.rol || '') {
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
}