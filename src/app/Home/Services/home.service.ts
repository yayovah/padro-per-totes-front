import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ItinerariDTO, ItinerariSeguitDTO, PasDTO, PasTextDTO } from '../../Shared/Models/itinerari.dto';
import { UserDTO } from '../../Auth/Model/auth.dto';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../Situacions/Model/situacio.dto';
import { CiutatDTO } from '../../Ciutat/Models/ciutat.dto';
import { Situacio } from '../../Situacions/Services/situacio';
import { Pregunta } from '../../Preguntes/Services/pregunta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ItinerariService } from './itinerari.service';
import { ModalService } from '../../Shared/Components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private situacioService = inject(Situacio);
  private preguntaService = inject(Pregunta);
  private itinerariService = inject(ItinerariService);
  private modalService = inject(ModalService);
  
  usuari = signal<UserDTO | null>(null);
  preguntes = signal<PreguntaDTO[]>([]);
  situacions = signal<SituacioDTO[]>([]);
  
  
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idPreguntaSeleccionada = signal<number | null>(null);
  preguntaSeleccionada = computed(() => {
    return this.preguntes().find(p => p.id == this.idPreguntaSeleccionada()) ?? this.carregaPregunta();
  });
  
  idSituacioSeleccionada = signal<number | null>(null);
  situacioSeleccionada = computed(() => {
    return this.situacions().find(p => p.id == this.idSituacioSeleccionada()) ?? null;
  });
  
  itinerariSeguit  = signal<ItinerariSeguitDTO | null>(null);
  idItinerari = computed(() => this.itinerariSeguit()?.itinerari.id);
  passos = signal<PasTextDTO[]>([]);

  accioActual= signal<String | null>("");  

  private readonly baseUrl = environment.apiUrl;
  private readonly pdfEndpoint = '/itinerariPdf';
  private readonly url = `${this.baseUrl}${this.pdfEndpoint}`;

  constructor(private http: HttpClient){
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
          this.situacions.set(situacions);
          if(situacions.length === 0){this.carregaPasFinal();}
        },
        error: (error) => this.modalService.showModalError("Error al intentar cargar" , error)
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
        error: ((error) => this.modalService.showModalError("Error al intentar cargar", error))
      });
      this.carregaSituacions();
    }
  }

  baixarPDFdeAPI(id: number) : Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`, {responseType: 'blob' as 'json'}).pipe(
          //en cas d'error en la petició
          catchError((error) => {
            this.modalService.showModalError('Error en descargar el PDF del servidor:', error);
            return throwError(() => new Error('Error en el PDF'));
          })
    );
  }

  carregaPasFinal(){
    this.passos.update((passos) => 
      [...passos, { pregunta: this.preguntaSeleccionada()! }]);
  }


  guardaPas(){
    const pas:PasDTO = {
      itinerari: this.idItinerari()!,
      pregunta: this.idPreguntaSeleccionada()!,
      resposta: this.situacioSeleccionada()?.resposta?.id!
    }
    const pasText:PasTextDTO = {
      pregunta: this.situacioSeleccionada()?.pregunta!,
      resposta: this.situacioSeleccionada()?.resposta!
    }
    this.passos.update((passos) => [...passos, pasText]);
    
    this.itinerariService.createPas(pas).subscribe({
      next: (pas) => this.itinerariSeguit.set(
        {itinerari:this.itinerariSeguit()?.itinerari!, passos: [...this.itinerariSeguit()?.passos || [], pas]}),
      error: (error) => this.modalService.showModalError(error)
    });
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


