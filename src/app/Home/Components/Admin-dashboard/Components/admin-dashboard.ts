import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectCiutatIdSeleccionada } from '../../../../Ciutat/Selectors/ciutats.selector';
import { selectPreguntaIdSeleccionada, selectPreguntes, selectRespostes, selectSituacions } from '../Selectors/adminDashboard.selectors';
import { LlistableDTO } from '../../../../Shared/Models/llistable.dto';
import { PreguntaDTO } from '../../../../Preguntes/Models/pregunta.dto';
import { SelectCiutats } from '../../../../Ciutat/Components/select-ciutats/select-ciutats';
import { List } from '../../../../Shared/Components/list/list';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import * as CiutatsActions from '../../../../Ciutat/Actions/ciutat.action';
import { Actions, ofType } from '@ngrx/effects';
import { Card } from '../../../../Shared/Components/card/card';
import { ListInCard } from '../../../../Shared/Components/list-in-card/list-in-card';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../../Shared/Components/form-controls/submit/submit';
import { RespostaDTO } from '../../../../Respostes/Models/resposta.dto';
import { SituacioDTO } from '../../../../Situacions/Model/situacio.dto';
import { PreguntaForm } from '../../../../Preguntes/Components/pregunta-form/pregunta-form';
import { SituacioForm } from '../../../../Situacions/Components/situacio-form/situacio-form';


@Component({
  selector: 'app-admin-dashboard',
  imports: [SelectCiutats, List, Card, ListInCard, CommonModule, Submit, PreguntaForm, SituacioForm],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private store = inject(Store<AppState>);
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });  
  idPreguntaSeleccionada = toSignal(this.store.select(selectPreguntaIdSeleccionada), { initialValue: null });  
  private preguntes = toSignal(this.store.select(selectPreguntes), { initialValue: [] });
  //private respostes = toSignal(this.store.select(selectRespostes), { initialValue: [] });
  private situacions = toSignal(this.store.select(selectSituacions), { initialValue: [] });

  //ciutatAdmins = toSignal(this.store.select(selectCiutatAdmins), { initialValue: [] });

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
    };
  }
  )
  );

  // ACCIONS

  private actions$ = inject(Actions);
  accioActual= signal<String | null>("");
  
  addResposta = signal<boolean>(false);

  //Per tancar el formulari d'afegir usuari (és l'únic cas en que no hi ciutat seleccionada)
  private successListener = this.actions$.pipe(
    ofType(AdminDashboardActions.createPreguntaSuccess),
    takeUntilDestroyed()
  ).subscribe(() => {
    this.accioActual.set(null)});

    

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }){
    // Implementa la lògica per gestionar les accions rebudes des del component fill
    this.accioActual.set(event.type);
    console.log( "La pregunta: ",this.idPreguntaSeleccionada());

    //Si seleccionem una pregunta...
    if(event.id){
      this.store.dispatch(AdminDashboardActions.selectPregunta({ preguntaId: event.id }));
      console.log( this.accioActual());
      //Veure llistat de les respostes
      if(this.accioActual() === 'view'){
        this.store.dispatch(AdminDashboardActions.getSituacions({ ciutatId: this.idCiutatSeleccionada()!, preguntaId: this.idPreguntaSeleccionada()! }));
      }

      //Eliminar la pregunta
      if(this.accioActual() === 'delete'){
        //this.store.dispatch(AdminDashboardActions.deletePregunta({ preguntaId: event.id }));
      }
    }

    //Per afegir preguntes eliminem la pregunta seleccionada
    if(this.accioActual() === 'add'){
      this.store.dispatch(AdminDashboardActions.resetSelectPregunta());
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
