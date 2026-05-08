import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CiutatDTO } from '../../../Ciutat/Models/ciutat.dto';
import { RespostaDTO } from '../../../Respostes/Models/resposta.dto';
import { PreguntaDTO } from '../../../Preguntes/Models/pregunta.dto';
import { SituacioDTO } from '../../../Situacions/Model/situacio.dto';
import { Pregunta } from '../../../Preguntes/Services/pregunta';
import { SelectCiutats } from '../../../Ciutat/Components/select-ciutats/select-ciutats';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../Services/home.service';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { ListInCard } from '../../../Shared/Components/list-in-card/list-in-card';
import { Card } from '../../../Shared/Components/card/card';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Auth } from '../../../Auth/Services/auth';
import { ModalService } from '../../../Shared/Components/modal/modal.service';
import { ItinerariService } from '../../Services/itinerari.service';
import { PasDTO, PasTextDTO } from '../../../Shared/Models/itinerari.dto';
import { Imtages } from '../../../Shared/Services/imtages';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  imports: [SelectCiutats, CommonModule, ListInCard, Card, Submit, MarkdownModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home{
  private homeService = inject(HomeService);
  private preguntaService = inject(Pregunta);
  private itinerariService = inject(ItinerariService);
  private authService = inject(Auth);
  private modalService = inject(ModalService);
  private imatgeService = inject(Imtages);
  
  //private ciutatsService = inject(Ciutats);

  ciutatSeleccionada = computed(() => this.homeService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  idPreguntaSeleccionada = computed(() => this.homeService.idPreguntaSeleccionada())
  preguntaSeleccionada = computed(() => this.homeService.preguntaSeleccionada());
  preguntes = computed(() => this.homeService.preguntes());

  situacions = computed(()=>this.homeService.situacions());
  idSituacioSeleccionada = computed(() => this.homeService.idSituacioSeleccionada());
  situacioSeleccionada = computed(() => this.homeService.situacioSeleccionada());

  respostes = signal<RespostaDTO[]>([]);

  itinerari = computed(() => this.homeService.itinerariSeguit());
  idItinerari = computed(() => this.homeService.idItinerari());


  //passos = signal<PasTextDTO[]>([]);
  passos = computed(() => this.homeService.passos());

    // Creem l'array de llistables a partir de l'array de preguntes
   preguntesLlistables = computed<LlistableDTO[]>(() => 
      this.preguntes().map((pregunta: PreguntaDTO) => ({
        id: pregunta.id,
        nom: pregunta.titol,
      }))
    );
  
    // Creem l'array de llistables a partir de l'array de respostes
    situacionsLlistables = computed<LlistableDTO[]>(() => 
      this.situacions().map((situacio: SituacioDTO) => { return {
        id: situacio.id,
        nom: situacio.resposta?.text ?? ''
      };})
    );

    imatgeActual = signal<string | null>(null);


  constructor(){
    effect(() => {
        this.imatgeService.getImatgeById(this.preguntaSeleccionada()?.imatge!).subscribe({
          next: (imatge) => this.imatgeActual.set(imatge.path),
        });
      
      console.log("IMATGE ACTUAL:",this.imatgeActual());
    });

  }

  actualitzarCiutat(ciutatOutput: CiutatDTO | undefined){
    this.homeService.ciutatSeleccionada.set(ciutatOutput ?? null);
    this.carregaSituacionsInicials();
  }

  carregaSituacionsInicials(){
    if(this.idCiutatSeleccionada()){
      this.itinerariService.createItinerari({ciutat: this.idCiutatSeleccionada()!}).subscribe({
        next: (itinerari) => this.homeService.itinerariSeguit.set({itinerari : itinerari}),
        error: (error) => this.modalService.showModalError(error)
      });
      this.preguntaService.getPrimeraPregunta(this.idCiutatSeleccionada()!).subscribe({
        next: (pregunta) => {
          this.homeService.idPreguntaSeleccionada.set(pregunta.id);
          this.homeService.preguntes.set([pregunta]);
          this.homeService.carregaSituacions();
        },
        error: (error) => this.modalService.showModalError(error)
      })
    } 
  }

  seleccionaResposta(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    if(event.id){
      this.homeService.idSituacioSeleccionada.set(event.id);
      this.homeService.guardaPas();
      //Afegeix la següent pregunta
      this.homeService.idPreguntaSeleccionada.set(this.homeService.situacioSeleccionada()?.seguent_pregunta?.id!);
    }
  }

  baixarPdf(){
        //Petició a la api
    this.homeService.baixarPDFdeAPI(this.idItinerari()!).subscribe({
      next: (pdf) => {
        const file = new Blob([pdf], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL); // Això obrirà el PDF en una nova pestanya
      },
      error: (error) => this.modalService.showModalError("Error en descargar el pdf: " +error)
      
    })
    if(!this.authService.credentials()?.user.email){
        this.modalService.showRegistre();
    }
  }
}

      /*
      A DESENVOLUPAR:
      pensar com se sap la primera pregunta d'una ciutaT!!!
      si és final (o sigui, no pregunta sinó final d'itinerari, que no té respostes) marcar amb una resposta -1
      */
