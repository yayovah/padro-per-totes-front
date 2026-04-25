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
  
  situacions = computed(() => this.adminDashService.situacions());
  respostes = computed(() => this.adminDashService.respostes());
  accioActual = computed(() => this.adminDashService.accioActual());
  
  ciutatSeleccionada = computed(() => this.adminDashService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  preguntes = computed(() => this.adminDashService.preguntes());
  idPreguntaSeleccionada = computed(() => this.adminDashService.idPreguntaSeleccionada());
  preguntaSeleccionada = computed(() => this.preguntes().find(p => p.id === this.idPreguntaSeleccionada()) ?? null);
  
  idPreguntaSeguent = signal<number | null>(null);
  
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
    this.carregaPreguntes();
  }

  carregaPreguntes(){
    if(this.idCiutatSeleccionada()){
      this.preguntaService.getPreguntesByCiutat(this.idCiutatSeleccionada()!).subscribe({
        next: (preguntes) => this.adminDashService.preguntes.set(preguntes),
        error: (error) => console.error('Error al obtener las preguntas:', error)
      });
    } 
  }

  actualitzarPregunta(preguntaActual: PreguntaDTO | undefined){
    if(preguntaActual){
      if(this.accioActual() === 'edit'){
        this.adminDashService.preguntes
          .update(preguntes => preguntes.map(p => p.id === preguntaActual.id ? preguntaActual : p));
        this.adminDashService.accioActual.set('view');
      }
      else{
        this.adminDashService.preguntes
          .update(preguntes => [...preguntes, preguntaActual]);
        switch(this.accioActual()){
          case 'add':
            this.adminDashService.accioActual.set('view');
            this.adminDashService.idPreguntaSeleccionada.set(preguntaActual.id);
            break;
          case 'addPregunta':
            this.adminDashService.idSituacioSeleccionada()?
              this.adminDashService.accioActual.set('edit'):
              this.adminDashService.accioActual.set('add');
            this.idPreguntaSeguent.set(preguntaActual.id);
            break;
        }
      }
    }
  }

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    this.adminDashService.accioActual.set(event.type);
    this.adminDashService.idPreguntaSeleccionada.set(event.id ?? null);
    
    //Si és el cas d'afegir preguntes, eliminem la pregunta seleccionada
    if(this.accioActual() === 'add'){
      this.adminDashService.idPreguntaSeleccionada.set(null);
    }
   
    if(this.idPreguntaSeleccionada()){
      if(event.type === 'view'){
        this.situacioService.getSituacionsByPregunta(this.idPreguntaSeleccionada()!).subscribe({
          next: ((situacions) => 
            this.adminDashService.situacions.set(situacions)),
          error: ((error) => console.error("Error al intentar cargar", error))
        });
      }
      if(event.type === 'delete'){
        this.preguntaService.deletePregunta(this.idPreguntaSeleccionada()!).subscribe({
          next: () => {
            this.adminDashService.preguntes.update(preguntes => preguntes.filter(p => p.id !== this.idPreguntaSeleccionada()));
            this.adminDashService.idPreguntaSeleccionada.set(null);
          },
          error: (error) => console.error("Error al intentar eliminar la pregunta", error)
        });  
      }
    }
  }

  handleAccioSituacions(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    if(event.type === 'delete' && event.id){
      this.situacioService.deleteSituacio(event.id).subscribe({
        next: (a) => {
          console.log('situacio eliminada', a);
          this.adminDashService.situacions.update((situacions) => situacions.filter((sit) => sit.id !== event.id));
        },
        error: (error) =>console.error(error)
      })
    }
  }

  afegeixResposta(toggle: boolean =true){
    this.adminDashService.accioActual.set("add");
  }

  cancelarNovaResposta(){
    this.adminDashService.accioActual.set('view');
  }
}
