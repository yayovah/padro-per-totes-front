import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CiutatDTO } from '../Models/ciutat.dto';

@Injectable({
  providedIn: 'root',
})
export class Ciutats {
  //private readonly baseUrl = 'https://api.padronparatodxs.net/api';
  private readonly baseUrl = 'http://127.0.0.1:8000/api';
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
      console.log(this.url);
    //Petició a la api
    return this.http
    .get<CiutatDTO[]>(this.url)
    .pipe(
      //en cas d'error en la petició
      catchError((error) => {
        console.error('Error recuperando ciudades del servidor:', error);
        return throwError(() => new Error('Error fetching cities'));
      })
    );
  }
}
