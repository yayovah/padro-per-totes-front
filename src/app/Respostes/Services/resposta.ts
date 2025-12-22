import { Injectable } from '@angular/core';
import { RespostaDTO } from '../Models/resposta.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Resposta {
    getRespostesByPregunta(preguntaId: number): Observable<RespostaDTO[]>{}
  
    createResposta(dadesResposta: Omit<RespostaDTO, 'id'>, preguntaId: number): Observable<RespostaDTO[]>{}
  
    updateResposta(resposta: RespostaDTO): Observable<RespostaDTO[]>{}
  
    deleteResposta(respostaId: number): Observable<any>{}
}
