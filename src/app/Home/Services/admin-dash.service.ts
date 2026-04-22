import { Injectable, signal } from '@angular/core';
import { CiutatDTO } from '../../Ciutat/Models/ciutat.dto';
import { Pregunta } from '../../Preguntes/Services/pregunta';
import { RespostaDTO } from '../../Respostes/Models/resposta.dto';
import { SituacioDTO } from '../../Situacions/Model/situacio.dto';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { UserDTO } from '../../Shared/Models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminDashService {
  usuari = signal<UserDTO | null>(null);
  preguntes = signal<PreguntaDTO[]>([]);
  situacions = signal<SituacioDTO[]>([]);
  respostes = signal<RespostaDTO[]>([]);
  
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idPreguntaSeleccionada = signal<number | null>(null);
}
