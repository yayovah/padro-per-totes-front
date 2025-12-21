import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { List } from '../../../Shared/Components/list/list';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { CiutatDTO } from '../../Models/ciutat.dto';
import * as CiutatsAction from '../../Actions/ciutat.action';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Shared/Components/card/card';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { selectCiutatAdmins, selectCiutatIdSeleccionada, selectCiutats } from '../../Selectors/ciutats.selector';
import { UserDTO } from '../../../Shared/Models/user.dto';
import { ListInCard } from '../../../Shared/Components/list-in-card/list-in-card';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { CiutatForm } from '../ciutat-form/ciutat-form';
import { Actions, ofType } from '@ngrx/effects';
import * as CiutatsActions from '../../Actions/ciutat.action';
import { AddAdmin } from '../add-admin/add-admin';


@Component({
  selector: 'app-superadmin-dashboard',
  imports: [List, CommonModule, Card, ListInCard, Submit, CiutatForm, AddAdmin],
  templateUrl: './superadmin-dashboard.html',
  styleUrl: './superadmin-dashboard.scss',
})
export class SuperadminDashboard implements OnInit {
  // Ús de l'store amb signals
  private store = inject(Store<AppState>);

  private ciutats = toSignal(this.store.select(selectCiutats), { initialValue: [] });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });
  ciutatAdmins = toSignal(this.store.select(selectCiutatAdmins), { initialValue: [] });

  // Creem l'array de llistables a partir de l'array de ciutats
  ciutatsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutats().map((ciutat: CiutatDTO) => ({
      id: ciutat.id,
      nom: ciutat.nom
    }))
  );

  ciutatSeleccionada = computed<CiutatDTO | undefined>(() => {
    return this.ciutats().find(ciutat => ciutat.id === this.idCiutatSeleccionada());
  });

  adminsLlistables = computed<LlistableDTO[]>(() => 
    this.ciutatAdmins().map((admin: UserDTO) => ({
      id: admin.id,
      nom: admin.email
    }))
  );
  
  private actions$ = inject(Actions);
  accioActual= signal<String | null>("");
  //Per tancar el formulari d'afegir usuari (és l'únic cas en que no hi ciutat seleccionada)
  private successListener = this.actions$.pipe(
    ofType(CiutatsActions.createCiutatSuccess),
    takeUntilDestroyed()
  ).subscribe(() => {
    console.log('ARA SÍ! Acció detectada');
    this.accioActual.set(null)});

  addAdmin = signal<boolean>(false);

  ngOnInit(): void {
    this.store.dispatch(CiutatsAction.getCiutats());
  }

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    // Implementa la lògica per gestionar les accions rebudes des del component fill
    this.accioActual.set(event.type);
    console.log( this.accioActual());
    if(event.id){
      this.store.dispatch(CiutatsAction.selectCiutat({ ciutatId: event.id }));
      if(this.accioActual() === 'view'){
        this.store.dispatch(CiutatsAction.getCiutatAdmins({ ciutatId: this.idCiutatSeleccionada()! }));
      }
      if(this.accioActual() === 'delete'){
        this.store.dispatch(CiutatsAction.deleteCiutat({ ciutatId: this.idCiutatSeleccionada()! }));
      }
    }

    if(this.accioActual() === 'add'){
      this.store.dispatch(CiutatsAction.resetSelectCiutat());
    }
  }

  handleAccioAdmins(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', id?: any }): void {
    // Implementa la lògica per gestionar les accions rebudes des del component fill
    console.log('Acció admin ciutat:', event);
    if(event.id){

      if(event.type === 'delete'){
        console.log('delete admin', event.id)
        this.store.dispatch(CiutatsAction.deleteAdminFromCiutat({ ciutatId: this.idCiutatSeleccionada()!, adminId: event.id }));
      }
    }
  }

  afegeixAdmin(){
      this.addAdmin.set(true);
  }
}
