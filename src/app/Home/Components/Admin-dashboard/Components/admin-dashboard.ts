import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ciutats } from '../../../../Ciutat/Services/ciutats';
import { Pregunta } from '../../../../Preguntes/Services/pregunta';
import { Situacio } from '../../../../Situacions/Services/situacio';
import { Resposta } from '../../../../Respostes/Services/resposta';

import { LlistableDTO } from '../../../../Shared/Models/llistable.dto';
import { PreguntaDTO } from '../../../../Preguntes/Models/pregunta.dto';
import { RespostaDTO } from '../../../../Respostes/Models/resposta.dto';
import { SituacioDTO } from '../../../../Situacions/Model/situacio.dto';
import { CiutatDTO } from '../../../../Ciutat/Models/ciutat.dto';

import { List } from '../../../../Shared/Components/list/list';
import { Card } from '../../../../Shared/Components/card/card';
import { ListInCard } from '../../../../Shared/Components/list-in-card/list-in-card';
import { SelectCiutats } from '../../../../Ciutat/Components/select-ciutats/select-ciutats';
import { Submit } from '../../../../Shared/Components/form-controls/submit/submit';
import { PreguntaForm } from '../../../../Preguntes/Components/pregunta-form/pregunta-form';
import { SituacioForm } from '../../../../Situacions/Components/situacio-form/situacio-form';
import { AdminDashService } from '../../../Services/admin-dash.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [SelectCiutats, List, Card, ListInCard, CommonModule, Submit, PreguntaForm, SituacioForm],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
//  private selectCiutatService = inject(Ciutats);
  private adminDashService = inject(AdminDashService);

  private preguntaService = inject(Pregunta);
  private situacioService = inject(Situacio)
  private respostaService = inject(Resposta);
  
  //ciutatSeleccionada = signal<CiutatDTO | null>(null);
  ciutatSeleccionada = computed(() => this.adminDashService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  //preguntes = signal<PreguntaDTO[]>([]);
  preguntes = computed(() => this.adminDashService.preguntes());

  //idPreguntaSeleccionada = signal<number | null>(null);
  idPreguntaSeleccionada = computed(() => this.adminDashService.idPreguntaSeleccionada());
  preguntaSeleccionada = computed(() => this.preguntes().find(p => p.id === this.idPreguntaSeleccionada()) ?? null);
  
  //situacions = signal<SituacioDTO[]>([]);
  situacions = computed(() => this.adminDashService.situacions());
  
  //respostes = signal<RespostaDTO[]>([]);
  respostes = computed(() => this.adminDashService.respostes());

  accioActual= signal<String | null>("");
  addResposta = signal<boolean>(false);
  
  // LLISTABLES

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

  actualitzarCiutat(ciutatOutput: CiutatDTO | undefined){
    this.adminDashService.ciutatSeleccionada.set(ciutatOutput ?? null);
    //this.ciutatSeleccionada.set(ciutatOutput ?? null);
    this.carregaPreguntes();
  }

  carregaPreguntes(){
    if(this.idCiutatSeleccionada()){
      this.preguntaService.getPreguntesByCiutat(this.idCiutatSeleccionada()!).subscribe({
        next: (preguntes) => 
          //this.preguntes.set(preguntes),
          this.adminDashService.preguntes.set(preguntes),
        error: (error) => console.error('Error al obtener las preguntas:', error)
      });
    } 
  }

  modificarPregunta(preguntaOutput: PreguntaDTO | undefined){
    //this.preguntes.set(this.preguntes().map(p => p.id === preguntaOutput?.id ? preguntaOutput : p));
    this.adminDashService.preguntes.update(preguntes => preguntes.map(p => p.id === preguntaOutput?.id ? preguntaOutput : p));
  }

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    this.accioActual.set(event.type);
    //this.idPreguntaSeleccionada.set(event.id ?? null);
    this.adminDashService.idPreguntaSeleccionada.set(event.id ?? null);
    
    //Si és el cas d'afegir preguntes, eliminem la pregunta seleccionada
    if(this.accioActual() === 'add'){
      //this.idPreguntaSeleccionada.set(null);
      this.adminDashService.idPreguntaSeleccionada.set(null);
    }
   
    if(this.idPreguntaSeleccionada()){
      if(event.type === 'view'){
        this.situacioService.getSituacionsByPregunta(this.idPreguntaSeleccionada()!).subscribe({
          next: ((situacions) => 
            //this.situacions.set(situacions)),
            this.adminDashService.situacions.set(situacions)),
          error: ((error) => console.error("Error al intentar cargar", error))
        });
      }
      if(event.type === 'delete'){
        this.preguntaService.deletePregunta(this.idPreguntaSeleccionada()!).subscribe({
          next: () => {
            //this.preguntes.set(this.preguntes().filter(p => p.id !== this.idPreguntaSeleccionada()));
            this.adminDashService.preguntes.update(preguntes => preguntes.filter(p => p.id !== this.idPreguntaSeleccionada()));
            //this.idPreguntaSeleccionada.set(null);
            this.adminDashService.idPreguntaSeleccionada.set(null);
          },
          error: (error) => console.error("Error al intentar eliminar la pregunta", error)
        });  
      }
    }
  }

  handleAccioSituacions(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    console.log(event);
  }

  afegeixResposta(toggle: boolean =true){
    if(toggle){
      console.log("Afegint resposta a la pregunta " + this.idPreguntaSeleccionada());
    }
    else{      
      console.log("Cancel·lant afegir resposta a la pregunta " + this.idPreguntaSeleccionada());
    }
    this.addResposta.set(toggle);
  }
}
