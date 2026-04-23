import { Component, computed, effect, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-home',
  imports: [SelectCiutats, CommonModule, ListInCard, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private homeService = inject(HomeService);
  private preguntaService = inject(Pregunta);
  
  //private ciutatsService = inject(Ciutats);

  ciutatSeleccionada = computed(() => this.homeService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  idPreguntaSeleccionada = computed(() => this.homeService.idPreguntaSeleccionada())
  preguntaSeleccionada = computed(() => this.homeService.preguntaSeleccionada());
  preguntes = computed(() => this.homeService.preguntes());

  situacions = computed(()=>this.homeService.situacions());
  idSituacioSeleccionada = computed(() => this.homeService.idSituacioSeleccionada());

  respostes = signal<RespostaDTO[]>([]);

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

/* 
  ngOnInit(): void {
    this.ciutatsService.getCiutats().subscribe((ciutats: CiutatDTO[]) => {
      this.ciutats.set(ciutats);
    });

  } */

  actualitzarCiutat(ciutatOutput: CiutatDTO | undefined){
    this.homeService.ciutatSeleccionada.set(ciutatOutput ?? null);
    this.carregaSituacionsInicials();
  }

  carregaSituacionsInicials(){
    if(this.idCiutatSeleccionada()){
      this.preguntaService.getPrimeraPregunta(this.idCiutatSeleccionada()!).subscribe({
        next: (pregunta) => {
          this.homeService.idPreguntaSeleccionada.set(pregunta.id);
          this.homeService.preguntes.set([pregunta]);
          this.homeService.carregaSituacions();
        },
        error: (error) => console.error(error)
      })
    } 
  }

  seleccionaResposta(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    if(event.id){
      this.homeService.idSituacioSeleccionada.set(event.id);
      //Afegeix la següent pregunta
      this.homeService.idPreguntaSeleccionada.set(this.homeService.situacioSeleccionada()?.seguent_pregunta?.id!);
    }
  }

  afegeixPregunta(){

  }
}

      /*
      A DESENVOLUPAR:
      pensar com se sap la primera pregunta d'una ciutaT!!!
      si és final (o sigui, no pregunta sinó final d'itinerari, que no té respostes) marcar amb una resposta -1
      */
