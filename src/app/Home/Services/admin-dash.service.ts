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
        this.monitor();
      }
    )
  }

  monitor(){
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
}


  //Estats
  /*
    veure ciutar: mostra les preguntes de la ciutat, sense cap pregunta seleccionada
         idCiutatSeleccionada
         accioActual = null

    afegir pregunta: mostra el formulari per crear una nova pregunta, sense cap pregunta seleccionada
          idCiutatSeleccionada
          accioActual = 'add'
        ->porta a veure pregunta

    veure pregunta: mostra les situacions de la pregunta seleccionada, sense cap situacio seleccionada
          idCiutatSeleccionada
          idPreguntaSeleccionada
          accioActual = 'view'
        ->porta a editar/afegir/eliminar situacio seleccionada

    editar pregunta: mostra el formulari de la pregunta seleccionada
          idCiutatSeleccionada
          idPreguntaSeleccionada
          accioActual = 'edit'
        ->porta a veure pregunta

    eliminar pregunta: no mostra, actua
          idCiutatSeleccionada
          idPreguntaSeleccionada
          accioActual = 'delete'
      ->torna a VEURE CIUTAT

    afegir situacio: mostra el formulari per crear una nova situacio, sense cap situacio seleccionada
          idCiutatSeleccionada
          idPreguntaSeleccionada
          accioActual = 'add'
          
          Per gurdar:
          idPreguntaSeguentSeleccionada
          textResposta requerit
        
          ->porta a veure pregunta

        **afegir pregunta següent: mostra el formulari per crear una nova pregunta
            idCiutatSeleccionada
            idPreguntaSeleccionada
            accioActual = 'addPregunta'
          ->porta a afegir situacio

    editar situacio: mostra el formulari de la situacio seleccionada
          idCiutatSeleccionada
          idPreguntaSeleccionada
          idSituacioSeleccionada
          accioActual = 'edit'
        ->porta a veure pregunta

        **afegir pregunta següent: mostra el formulari per crear una nova pregunta
            idCiutatSeleccionada
            idPreguntaSeleccionada
            idSituacioSeleccionada
            accioActual = 'addPregunta'
          ->porta a editar situacio

    eliminar situacio: no mostra, actua
          idCiutatSeleccionada
          idPreguntaSeleccionada
          idSituacioSeleccionada
          accioActual = 'delete'
      ->torna a VEURE PREGUNTA
  */