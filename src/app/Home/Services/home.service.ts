import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ItinerariDTO, ItinerariSeguitDTO, PasDTO } from '../../Shared/Models/itinerari.dto';
import { UserDTO } from '../../Auth/Model/auth.dto';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../Situacions/Model/situacio.dto';
import { CiutatDTO } from '../../Ciutat/Models/ciutat.dto';
import { Situacio } from '../../Situacions/Services/situacio';
import { Pregunta } from '../../Preguntes/Services/pregunta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private situacioService = inject(Situacio);
  private preguntaService = inject(Pregunta);
  
  usuari = signal<UserDTO | null>(null);
  preguntes = signal<PreguntaDTO[]>([]);
  situacions = signal<SituacioDTO[]>([]);
  
  itinerariSeguit  = signal<ItinerariSeguitDTO | null>(null);
  
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idPreguntaSeleccionada = signal<number | null>(null);
  preguntaSeleccionada = computed(() => {
    return this.preguntes().find(p => p.id == this.idPreguntaSeleccionada()) ?? this.carregaPregunta();
  });

  idSituacioSeleccionada = signal<number | null>(null);
  situacioSeleccionada = computed(() => {
    return this.situacions().find(p => p.id == this.idSituacioSeleccionada()) ?? null;
  });

  accioActual= signal<String | null>("");  

  private readonly baseUrl = environment.apiUrl;
  private readonly pdfEndpoint = '/itinerariPdf';
  private readonly url = `${this.baseUrl}${this.pdfEndpoint}`;

  constructor(private http: HttpClient){
    effect(()=> {
        //this.monitor();
      }
    )
  }

  monitor(){
      console.log("----------------ADMIN SERVICE -------------");
      console.log("usuari ", this.usuari());
      console.log("preguntes ", this.preguntes());
      console.log("situacions ", this.situacions());
      console.log("itinerari ", this.itinerariSeguit());
      console.log("ciutatSeleccionada ", this.ciutatSeleccionada());
      console.log("idSituacioSeleccionada ", this.idSituacioSeleccionada());
      console.log("preguntaSeleccionada ", this.preguntaSeleccionada());
      console.log("idPreguntaSeleccionada ", this.idPreguntaSeleccionada());
      //console.log("accioActual ", this.accioActual());
      console.log("----------------FINAL SERVICE -------------");  
  }

  carregaSituacions(){
    if(this.idPreguntaSeleccionada()){
      this.situacioService.getSituacionsByPregunta(this.idPreguntaSeleccionada()!).subscribe({
        next: (situacions) => {
          //const situacionsNoves = situacions.filter(novaSit => !this.situacions().some(situacio => situacio.id === novaSit.id));
          //this.situacions.set([...this.situacions(), ...situacionsNoves]);
          this.situacions.set(situacions);
        },
        error: ((error) => console.error("Error al intentar cargar", error))
      });
    }
  }

  carregaPregunta(){
    if(this.idPreguntaSeleccionada()){
      this.preguntaService.getPreguntaById(this.idPreguntaSeleccionada()!).subscribe({
        next: (pregunta) => {
          if(!this.preguntes().find(p => p.id === pregunta.id)){
            this.preguntes.set([...this.preguntes(), pregunta]);
          }
        },
        error: ((error) => console.error("Error al intentar cargar", error))
      });
      this.carregaSituacions();
    }
  }

  baixarPDFdeAPI(id: number) : Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`, {responseType: 'blob' as 'json'}).pipe(
          //en cas d'error en la petició
          catchError((error) => {
            console.error('Error en descargar el PDF del servidor:', error);
            return throwError(() => new Error('Error en el PDF'));
          })
    );
  }
}

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


