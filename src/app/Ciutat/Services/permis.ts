import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CiutatDTO } from '../Models/ciutat.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Permis {
    private readonly baseUrl = environment.apiUrl;
    private readonly permisosEndpoint = '/permisos';
    private readonly url = `${this.baseUrl}${this.permisosEndpoint}`;

  constructor(private http: HttpClient) {}
  /**
   * Afegir administradora a ciutat 
   * 
   * @returns Permis
   * @throws Error en cas d'error en la petició
   *  
   */
  createPermis(ciutatId: number, adminId: number): Observable<any> {
    const permis:any = {
        usuaria : adminId,
        ciutat : ciutatId,
    }
    return this.http
      .post<any>(`${this.url}/`, permis)
        .pipe(catchError((error) => {
          console.error(`Error actualizando permisos en el servidor:`, error);
          return throwError(() => new Error('Error actualizando permisos'));
        }
      ));
  }
}
