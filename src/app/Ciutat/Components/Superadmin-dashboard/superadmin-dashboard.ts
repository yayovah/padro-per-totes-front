import { Component, computed, OnInit, signal } from '@angular/core';
import { List } from '../../../Shared/Components/list/list';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { CiutatDTO } from '../../Models/ciutat.dto';
import * as CiutatsAction from '../../Actions/ciutat.action';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Shared/Components/card/card';


@Component({
  selector: 'app-superadmin-dashboard',
  imports: [List, CommonModule, Card],
  templateUrl: './superadmin-dashboard.html',
  styleUrl: './superadmin-dashboard.scss',
})
export class SuperadminDashboard implements OnInit {
  ciutats = signal<CiutatDTO[]>([]);
  noms_ciutats = signal<string[]>([]);
//  ciutatSelected : CiutatDTO | null = null;
  ciutatSelected = signal<any>(null);

  constructor(
  //   private ciutatService: Ciutats,
    private store: Store<AppState>
  ) {
      this.store
      .select('ciutats')
      .subscribe(state => {
      this.ciutats.set(state.ciutats);
      this.noms_ciutats.set(this.ciutats().map(ciutat => ciutat.nom));
      // Afegeix això per veure si arriben les dades al component
      console.log('Ciutats rebudes:', this.ciutats); 
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CiutatsAction.getCiutats());
  }

  handleAccio(event: { type: 'edit' | 'delete' | 'view' | 'back' | 'add', item: any }): void {
    // Implementa la lògica per gestionar les accions rebudes des del component fill
    this.ciutatSelected.set(event.item);
    console.log(`Acció: ${event.type}`, event.item);
  }
}
