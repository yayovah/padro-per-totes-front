import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SituacioDTO } from '../Model/situacio.dto';
import { SituacioToBDDTO } from '../Model/situacioToBD.dto';
import { ModalService } from '../../Shared/Components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class Situacio {
  private modalService = inject(ModalService);

  private readonly baseUrl = environment.apiUrl;
  private readonly situacioEndpoint = '/situacions';
  private readonly url = `${this.baseUrl}${this.situacioEndpoint}`;
  private readonly respostesEndpoint = '/respostes';
  private readonly respostesUrl = `${this.baseUrl}${this.respostesEndpoint}`;

  private http = inject( HttpClient );

    getSituacionsByPregunta(preguntaId: number): Observable<SituacioDTO[]>{
      //Petició a la api
      return this.http
      .get<SituacioDTO[]>(`${this.url}/pregunta/${preguntaId}`)
      .pipe(
        //en cas d'error en la petició
        catchError((error) => {
          this.modalService.showModalError('Error recuperando situaciones del servidor:', error);
          return throwError(() => new Error('Error cargando situaciones'));
        }));
    }

    createSituacio(dades: any): Observable<any>{
      return this.http
        .post<SituacioDTO>(`${this.url}`, dades)
        .pipe(
          catchError((error) => {
            this.modalService.showModalError(`Error intentando crear la respuesta/situación:`, error);
            return throwError(() => new Error('Error creando respuesta/situación'));
        }));
    }
  
    updateSituacio(situacio: SituacioDTO): Observable<SituacioDTO>{
      const situacioToBD = {
        id: situacio.id,
        ciutat: situacio.ciutat.id,
        pregunta: situacio.pregunta.id,
        resposta: situacio.resposta?.id,
        seguent_pregunta: situacio.pregunta.id
      }
      return this.http
        .put<SituacioDTO>(`${this.url}/${situacio.id}`, situacio)
          .pipe(catchError((error) => {
            this.modalService.showModalError(`Error actualizando la respuesta/situación en el servidor:`, error);
            return throwError(() => new Error('Error actualizando respuesta/situación'));
          }
        ));
    }
  
    deleteSituacio(situacioId: number): Observable<any>{
      return this.http
        .delete<number>(`${this.url}/${situacioId}`)
        .pipe(
            catchError((error) => {
              this.modalService.showModalError(`Error intentando eliminar la respuesta/situación:`, error);
              return throwError(() => new Error('Error eliminando respuesta/situación'));
          }        
        ));
    }
}


