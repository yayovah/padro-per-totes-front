import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectCiutatIdSeleccionada } from '../../Ciutat/Selectors/ciutats.selector';
import { selectPreguntaIdSeleccionada, selectPreguntes } from '../Selectors/adminDashboard.selectors';
import { LlistableDTO } from '../../Shared/Models/llistable.dto';
import { PreguntaDTO } from '../../Preguntes/Models/pregunta.dto';
import { SelectCiutats } from '../../Ciutat/Components/select-ciutats/select-ciutats';
import { List } from '../../Shared/Components/list/list';
import * as AdminDashboardActions from '../Actions/adminDashboard.action';
import * as CiutatsActions from '../../Ciutat/Actions/ciutat.action';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SelectCiutats, List],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private store = inject(Store<AppState>);
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });  
  idPreguntaSeleccionada = toSignal(this.store.select(selectPreguntaIdSeleccionada), { initialValue: null });  
  private preguntes = toSignal(this.store.select(selectPreguntes), { initialValue: [] });

  //ciutatAdmins = toSignal(this.store.select(selectCiutatAdmins), { initialValue: [] });

  // Creem l'array de llistables a partir de l'array de ciutats
 preguntesLlistables = computed<LlistableDTO[]>(() => 
    this.preguntes().map((pregunta: PreguntaDTO) => ({
      id: pregunta.id,
      nom: pregunta.titol,
    }))
  );

  private actions$ = inject(Actions);
  accioActual= signal<String | null>("");
  
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
        //this.store.dispatch(AdminDashboardActions.getRespostes({ preguntaId: this.idPreguntaSeleccionada()! }));
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
}
