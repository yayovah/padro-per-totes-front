import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PreguntaDTO } from '../Models/pregunta.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Pregunta {

  private readonly baseUrl = environment.apiUrl;
  private readonly ciutatsEndpoint = '/preguntes';
  private readonly url = `${this.baseUrl}${this.ciutatsEndpoint}`;
  private http = inject( HttpClient );

  getPreguntesByCiutat(ciutatId: number): Observable<PreguntaDTO[]>{
        //Petició a la api
        return this.http
        .get<PreguntaDTO[]>(`${this.url}/ciutat/${ciutatId}`)
        .pipe(
          //en cas d'error en la petició
          catchError((error) => {
            console.error('Error recuperando preguntas del servidor:', error);
            return throwError(() => new Error('Error cargando preguntas'));
          })
        );
  }

  createPregunta(dadesPregunta: Omit<PreguntaDTO, 'id'>, ciutatId: number): Observable<PreguntaDTO>{
    return this.http
      .post<PreguntaDTO>(`${this.url}/ciutat/${ciutatId}`, dadesPregunta)
      .pipe(
          catchError((error) => {
            console.error(`Error intentando crear la pregunta:`, error);
            return throwError(() => new Error('Error creando pregunta'));
        }
      ));
  }

  updatePregunta(pregunta: PreguntaDTO): Observable<PreguntaDTO>{
    return this.http
      .put<PreguntaDTO>(`${this.url}/${pregunta.id}`, pregunta)
        .pipe(catchError((error) => {
          console.error(`Error actualizando la pregunta en el servidor:`, error);
          return throwError(() => new Error('Error actualizando pregunta'));
        }
      ));
  }

  deletePregunta(preguntaId: number): Observable<any>{
    return this.http
      .delete<number>(`${this.url}/${preguntaId}`)
      .pipe(
          catchError((error) => {
            console.error(`Error intentando eliminar la pregunta:`, error);
            return throwError(() => new Error('Error eliminando pregunta'));
        }        
      ));
  }
}
