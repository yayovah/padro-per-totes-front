import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CiutatDTO } from '../Models/ciutat.dto';
import { environment } from '../../../environments/environment';
import { ModalService } from '../../Shared/Components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class Permis {
  //Servei injectat
  private modalService = inject(ModalService);

  //Definició de la URL base i endpoints
  private readonly baseUrl = environment.apiUrl;
  private readonly permisosEndpoint = '/permisos';
  private readonly url = `${this.baseUrl}${this.permisosEndpoint}`;

  constructor(private http: HttpClient) {}

  /*** FUNCIONS DE PERMIS : CRIDES A LA API */

  //Funció per crear un nou permis d'administrador per una ciutat
  createPermis(ciutatId: number, adminId: number): Observable<any> {
    const permis:any = {
        usuaria : adminId,
        ciutat : ciutatId,
    }
    return this.http
      .post<any>(`${this.url}/`, permis)
        .pipe(catchError((error) => {
          this.modalService.showModalError(`Error actualizando permisos en el servidor:`, error);
          return throwError(() => new Error('Error actualizando permisos'));
        }
      ));
  }
}
