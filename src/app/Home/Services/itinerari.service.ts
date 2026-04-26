
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../Shared/Models/user.dto';
import { ItinerariDTO, ItinerariSeguitDTO, PasDTO } from '../../Shared/Models/itinerari.dto';

@Injectable({
  providedIn: 'root',
})
export class ItinerariService {
  
  private readonly baseUrl = environment.apiUrl;
  private readonly itinerarisEndpoint = '/itineraris';
  private readonly url = `${this.baseUrl}${this.itinerarisEndpoint}`;
  private readonly passosEndpoint = '/passos';
  private readonly urlPas = `${this.baseUrl}${this.passosEndpoint}`;

  constructor(private http: HttpClient) {}

  createItinerari(dadesItinerari: ItinerariDTO){
    return this.http
      .post<ItinerariDTO>(`${this.url}/`, dadesItinerari)
      .pipe(
          catchError((error) => {
            console.error(`Error intentando crear el itinerario :`, error);
            return throwError(() => new Error('Error creando itinerario '));
        }
      ));
  }

  createPas(dadesPas: PasDTO){
    return this.http
      .post<PasDTO>(`${this.urlPas}`, dadesPas)
      .pipe(
          catchError((error) => {
            console.error(`Error intentando crear el paso:`, error);
            return throwError(() => new Error('Error creando paso'));
        }
      ));
  }

  getItinerariById(itinerariId: number): Observable<ItinerariSeguitDTO> {
    return this.http
    .get<ItinerariSeguitDTO>(`${this.url}/${itinerariId}`)
    .pipe(
      catchError((error) => {
        console.error('Error recuperando itinerario del servidor:', error);
        return throwError(() => new Error('Error cargando itinerario'));
      })
    );
  }

  updateItinerari(dadesItinerari: ItinerariDTO): Observable<ItinerariDTO> {
    return this.http
      .put<ItinerariDTO>(`${this.url}/${dadesItinerari.id}`, dadesItinerari)
        .pipe(catchError((error) => {
          console.error(`Error actualizando el itinerario en el servidor:`, error);
          return throwError(() => new Error('Error actualizando itinerario'));
        }
      ));
  }
}