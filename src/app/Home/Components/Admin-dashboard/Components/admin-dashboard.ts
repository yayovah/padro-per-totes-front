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


@Component({
  selector: 'app-admin-dashboard',
  imports: [SelectCiutats, List, Card, ListInCard, CommonModule, Submit, PreguntaForm, SituacioForm],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private selectCiutatService = inject(Ciutats);
  private preguntaService = inject(Pregunta);
  private situacioService = inject(Situacio)
  private respostaService = inject(Resposta);
  
  ciutatSeleccionada = signal<CiutatDTO | null>(null);
  idCiutatSeleccionada = computed(() => this.ciutatSeleccionada()?.id ?? null);

  preguntes = signal<PreguntaDTO[]>([]);
  idPreguntaSeleccionada = signal<number | null>(null);
  situacions = signal<SituacioDTO[]>([]);
  respostes = signal<RespostaDTO[]>([]);

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
    this.ciutatSeleccionada.set(ciutatOutput ?? null);
    this.carregaPreguntes();
  }

  carregaPreguntes(){
    if(this.idCiutatSeleccionada()){
      this.preguntaService.getPreguntesByCiutat(this.idCiutatSeleccionada()!).subscribe({
        next: (preguntes) => this.preguntes.set(preguntes),
        error: (error) => console.error('Error al obtener las preguntas:', error)
      });
    } 
  }

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    // Implementa la lògica per gestionar les accions rebudes des del component fill
    this.accioActual.set(event.type);
    this.idPreguntaSeleccionada.set(event.id ?? null);
    
    //Per afegir preguntes eliminem la pregunta seleccionada
    if(this.accioActual() === 'add'){
      this.idPreguntaSeleccionada.set(null);
    }

    console.log( "La pregunta: ",this.idPreguntaSeleccionada());
    console.log( "evento: ",this.accioActual());
   
    if(this.idPreguntaSeleccionada()&& event.type === 'view'){
      this.situacioService.getSituacionsByPregunta(this.idPreguntaSeleccionada()!).subscribe({
        next: ((situacions) => this.situacions.set(situacions)),
        error: ((error) => console.error("Error al intentar cargar", error))
      });  
    }

    //Per afegir preguntes eliminem la pregunta seleccionada
    if(this.accioActual() === 'add'){
      this.idPreguntaSeleccionada.set(null);
    }
  }

  handleAccioSituacions(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    console.log(event);
  }

  afegeixResposta(){
    //console.log('afegeixResposta() <-- aqui')
    this.addResposta.set(true);
  }
}
