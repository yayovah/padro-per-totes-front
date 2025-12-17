import { Component } from '@angular/core';
import { CiutatDTO } from '../Models/ciutat.dto';
import { Ciutats } from '../Services/ciutats';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import * as CiutatsAction from '../Actions/ciutat.action';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciutats',
  imports: [CommonModule],
  templateUrl: './ciutats.html',
  styleUrl: './ciutats.scss',
})
export class CiutatsComponent implements OnInit {
  
  ciutats: CiutatDTO[] = [];
  
  constructor(
 //   private ciutatService: Ciutats,
    private store: Store<AppState>
  ) {
       this.ciutats = new Array<CiutatDTO>();
           this.store
      .select('ciutats')
      .subscribe(ciutats => {
      this.ciutats = ciutats.ciutats;
      // Afegeix això per veure si arriben les dades al component
      console.log('Ciutats rebudes:', this.ciutats); 
    });
  }

  ngOnInit(): void {


    this.store.dispatch(CiutatsAction.getCiutats());
  }
}
