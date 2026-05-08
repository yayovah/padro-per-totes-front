import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthDTO, RegisterDto, resetPswDTO, UserDTO } from '../Model/auth.dto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ModalService } from '../../Shared/Components/modal/modal.service';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Endpoints
  private readonly baseUrl = environment.apiUrl;
  private readonly loginEndpoint = '/login';
  private readonly loginUrl = `${this.baseUrl}${this.loginEndpoint}`;
  private readonly registerEndpoint = '/register';
  private readonly registerUrl = `${this.baseUrl}${this.registerEndpoint}`;
  private readonly usersEndpoint = '/users';
  private readonly url = `${this.baseUrl}${this.usersEndpoint}`;

  //Injecció de serveis
  private router = inject(Router);
  modalService = inject(ModalService);

  //Signals
  // Credencials accessibles des de l'app
  public credentials = signal<AuthDTO | null>(null);
  public accessToken = computed(() => this.credentials()?.token ?? null);
  public userRol = computed(() => this.credentials()?.user.rol ?? null);
  public userId = computed(() => this.credentials()?.user.id ?? null);

  constructor(private http: HttpClient) {
    //Comprovem si a l'Storage hi ha credencials guardades, si és així les carreguem a la signal
    if(!this.credentials()) {
      this.restoreCredentials();
    }
  }

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
        tap( credentials => this.acredita(credentials)),
        catchError((error) => {
          //Mostrar un modal, quan estigui el servei fet
          this.modalService.showModalError('Error haciendo login: ' , error.message)
          throw new Error(error);
      }))
      .subscribe();
  }

  logout(): void {
    this.resetCredentials();
  }

  acredita(credentials: AuthDTO){
    this.credentials.set(credentials);
    this.storageCredentials();
    this.navigateByRol();
  }

  //Demana el rol de l'usuari a la API
  getUsersByRol(rol: string): Observable<AuthDTO[]> {
    return this.http
      .get<any[]>(`${this.url}/${rol}`)
      .pipe(
        catchError((error) => {
          this.modalService.showModalError(`Error recuperando administradores des del servidor:` , error);
          return throwError(() => new Error('Error recuperando listado de admins'));
        }
      ));
  }

  //Guardea les credencials a l'storage
  storageCredentials(): void {
    //Guardem les credencials essencials a l'storage
    //Si no existeix alguna credencials es guarda com a cadena buida '' (storage guarda strings)
    localStorage.setItem('authToken', this.credentials()?.token || '');
    localStorage.setItem('userRol', this.credentials()?.user.rol || '');
    localStorage.setItem('userId', this.credentials()?.user.id?.toString() || '');
  }

  //Esborra les credencials a l'storage
  resetCredentials(): void {
    this.credentials.set(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRol');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  restoreCredentials(): void {
    const userRol = localStorage.getItem('userRol')? localStorage.getItem('userRol')! : '';
    
    const userIdStr = localStorage.getItem('userId');
    const userId = (userIdStr && userIdStr !== '')? parseInt(userIdStr) : null;

    localStorage.getItem('authToken')? this.credentials.set({
      token: localStorage.getItem('authToken')!,
      user: {
        rol: userRol,
        id: userId || undefined
      }
    }) : null;
  }

  //Porta a la pàgina d'inici segons el rol de l'usuari
  navigateByRol(): void {
    switch(this.credentials()?.user.rol || '') {
      case 'usuari':
          this.router.navigate(['/home']);
          break;
      case 'admin':
          this.router.navigate(['/adminDash']);
          break;
      case 'superadmin':
          this.router.navigate(['/superadminDash']);
          break;
      default:
          this.router.navigate(['/home']);
          break;
    }
  }

  registre(data: RegisterDto): void{
    this.http.post<AuthDTO>(this.registerUrl, data)
    .pipe(
      tap((credentials) => {
          this.acredita(credentials);
          this.modalService.showModalOk("Registro efectuado correctamente");
        }
      ),
      catchError((error) => {
        //Mostrar un modal, quan estigui el servei fet
        this.modalService.showModalError('Error registrando nuva usuária: ' , error.message);
        throw new Error('Error registrando nuva usuária: ' + error.message);
      }))
    .subscribe();
  }
}