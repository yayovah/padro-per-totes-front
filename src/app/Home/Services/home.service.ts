import { Injectable, signal } from '@angular/core';
import { ItinerariDTO, PasDTO } from '../../Shared/Models/itinerari.dto';
import { UserDTO } from '../../Auth/Model/auth.dto';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../Situacions/Model/situacio.dto';
import { CiutatDTO } from '../../Ciutat/Models/ciutat.dto';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  usuari = signal<UserDTO | null>(null);
  itinerari = signal<ItinerariDTO | null>(null);
  passos  = signal<PasDTO[] | null>(null);
  preguntes = signal<PreguntaDTO[]>([]);
  situacions = signal<SituacioDTO[]>([]);

  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idPreguntaSeleccionada = signal<number | null>(null);
  //idSituacioSeleccionada = signal<number | null>(null);

  accioActual= signal<String | null>("");  

  //Estats
  /*
    escollir ciutat: mostra les les ciutats

    veure ciutat: mostra la primera pregunta i les possibles respostes. Crea itinerari local
      idCiutatSeleccionada
      idPreguntaSeleccionada (la inicial)
      itinerari[]

      (sr) en seleccionar resposta 
        + idSituacioSel
        + idPregSel (la seg)
        + passos []
      
        -> porta a la següent pregunta

    següent pregunta
      idCiutatSeleccionada
      idPreguntaSeleccionada
      itinerari[]
      passos[]

      (sr)

    ultima pregunta
      idCiutatSeleccionada
      idPreguntaSeleccionada
      itinerari[]
      passos[]
      ultimaPregunta

      ->Enviar itinerari
      ->Veure PDF??

  */



}
