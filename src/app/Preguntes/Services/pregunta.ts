import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntaDTO } from '../Models/pregunta.dto';

@Injectable({
  providedIn: 'root',
})
export class Pregunta {
  getPreguntesByCiutat(ciutatId: number): Observable<PreguntaDTO[]>{}

  createPregunta(dadesPregunta: Omit<PreguntaDTO, 'id'>, ciutatId: number): Observable<PreguntaDTO[]>{}

  updatePregunta(pregunta: PreguntaDTO): Observable<PreguntaDTO[]>{}

  deletePregunta(preguntaId: number): Observable<any>{}
}
