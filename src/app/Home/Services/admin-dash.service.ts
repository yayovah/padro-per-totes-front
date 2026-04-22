import { effect, Injectable, signal } from '@angular/core';
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
  idSituacioSeleccionada = signal<number | null>(null);

  accioActual= signal<String | null>("");  

  constructor(){
    effect(()=> {
      console.log("----------------ADMIN SERVICE -------------");
      console.log("usuari ", this.usuari());
      console.log("preguntes ", this.preguntes());
      console.log("situacions ", this.situacions());
      console.log("respostes ", this.respostes());
      console.log("ciutatSeleccionada ", this.ciutatSeleccionada());
      console.log("idPreguntaSeleccionada ", this.idPreguntaSeleccionada());
      console.log("idSituacioSeleccionada ", this.idSituacioSeleccionada());
      console.log("accioActual ", this.accioActual());
      console.log("----------------FINAL SERVICE -------------");
      
      }
    )
  }
}
