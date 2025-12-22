import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RespostaDTO } from '../Models/resposta.dto';

@Injectable({
  providedIn: 'root',
})
export class Resposta {

  private readonly baseUrl = environment.apiUrl;
  private readonly ciutatsEndpoint = '/respostes';
  private readonly url = `${this.baseUrl}${this.ciutatsEndpoint}`;
  private http = inject( HttpClient );

    getRespostesByPregunta(preguntaId: number): Observable<RespostaDTO[]>{
      //Petició a la api
      return this.http
      .get<RespostaDTO[]>(`${this.url}/pregunta/${preguntaId}`)
      .pipe(
        //en cas d'error en la petició
        catchError((error) => {
          console.error('Error recuperando respuestas del servidor:', error);
          return throwError(() => new Error('Error cargando respuestas'));
        })
      );
    }
  
    createResposta(dadesResposta: Omit<RespostaDTO, 'id'>, preguntaId: number): Observable<RespostaDTO>{
      return this.http
        .post<RespostaDTO>(`${this.url}/pregunta/${preguntaId}`, dadesResposta)
        .pipe(
            catchError((error) => {
              console.error(`Error intentando crear la respuesta:`, error);
              return throwError(() => new Error('Error creando respuesta'));
          }
        ));
    }
  
    updateResposta(resposta: RespostaDTO): Observable<RespostaDTO>{
    return this.http
      .put<RespostaDTO>(`${this.url}/${resposta.id}`, resposta)
        .pipe(catchError((error) => {
          console.error(`Error actualizando la respuesta en el servidor:`, error);
          return throwError(() => new Error('Error actualizando respuesta'));
        }
      ));

    }
  
    deleteResposta(respostaId: number): Observable<any>{
      return this.http
        .delete<number>(`${this.url}/${respostaId}`)
        .pipe(
            catchError((error) => {
              console.error(`Error intentando eliminar la respuesta:`, error);
              return throwError(() => new Error('Error eliminando respuesta'));
          }        
        ));
    }
}
