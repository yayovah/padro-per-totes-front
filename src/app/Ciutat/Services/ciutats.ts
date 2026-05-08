import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CiutatDTO } from '../Models/ciutat.dto';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../Shared/Models/user.dto';
import { ModalService } from '../../Shared/Components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class Ciutats {
  modalService = inject(ModalService);

  private readonly baseUrl = environment.apiUrl;
  private readonly ciutatsEndpoint = '/ciutats';
  private readonly url = `${this.baseUrl}${this.ciutatsEndpoint}`;

  constructor(private http: HttpClient) {}
  /**
   * Obtenir llistat de ciutats des de la API
   * 
   * @returns CiutatDTO[] : array de ciutats des de la API
   * @throws Error en cas d'error en la petició
   *  
   */
  getCiutats(): Observable<CiutatDTO[]> {
    //Petició a la api
    return this.http
    .get<CiutatDTO[]>(this.url)
    .pipe(
      //en cas d'error en la petició
      catchError((error) => {
        this.modalService.showModalError('Error recuperando ciudades del servidor:', error);
        return throwError(() => new Error('Error fetching ciutat'));
      })
    );
  }

  getAdminsCiutat(ciutatId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/${ciutatId}/admins`)
      .pipe(
        catchError((error) => {
         this.modalService.showModalError(`Error recuperando administradores de la ciudad del servidor:`, error);
          return throwError(() => new Error('Error fetching ciutat admins'));
        }
      ));
  }

  updateCiutat(dadesCiutat: CiutatDTO): Observable<CiutatDTO> {
    return this.http
      .put<CiutatDTO>(`${this.url}/${dadesCiutat.id}`, dadesCiutat)
        .pipe(catchError((error) => {
          this.modalService.showModalError(`Error actualizando la ciudad en el servidor:`, error);
          return throwError(() => new Error('Error updating ciutat'));
        }
      ));
  }

  createCiutat(dadesCiutat:  Omit<CiutatDTO, 'id'>){
    return this.http
      .post<CiutatDTO>(`${this.url}`, dadesCiutat)
      .pipe(
          catchError((error) => {
            this.modalService.showModalError(`Error intentando crear la ciudad:`, error);
            return throwError(() => new Error('Error creating ciutat'));
        }
      ));
  }

  deleteCiutat(ciutatId: number){
    return this.http
      .delete<number>(`${this.url}/${ciutatId}`)
      .pipe(
          catchError((error) => {
            this.modalService.showModalError(`Error intentando eliminar la ciudad:`, error);
            return throwError(() => new Error('Error deleting ciutat'));
        }        
      ));
  }

  deletePermis(ciutatId: number, adminId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/ciutat/${ciutatId}/admin/${adminId}`)
        .pipe(catchError((error) => {
          this.modalService.showModalError(`Error actualizando permisos en el servidor:`, error);
          return throwError(() => new Error('Error actualizando permisos'));
        }
      ));
    }

    getCiutatsAdministrades(userId: number){
      return this.http
      .get<any>(`${this.url}/administrades/${userId}`)
      .pipe(
        catchError((error) => {
          this.modalService.showModalError(`Error recuperando ciudades administradas del servidor:`, error);
          return throwError(() => new Error('Error recuperando cudades administradas'));
        }
      ));

    }
}

