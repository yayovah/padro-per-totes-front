import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import * as CiutatsAction from '../../Actions/ciutat.action';
import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCredentials } from '../../../Auth/Selectors/auth.selector';
import { selectCiutatIdSeleccionada, selectCiutats } from '../../Selectors/ciutats.selector';
import { CiutatDTO } from '../../Models/ciutat.dto';


@Component({
  selector: 'app-select-ciutats',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    Submit
  ],
  templateUrl: './select-ciutats.html',
  styleUrl: './select-ciutats.scss',
})
export class SelectCiutats implements OnInit{
  private store = inject(Store<AppState>);
  private usuaria = toSignal(this.store.select(selectCredentials));
  
  private ciutats = toSignal(this.store.select(selectCiutats), { initialValue: [] });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null }); 

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

  ciutat: FormControl;
  selectCiutatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.ciutat = new FormControl('', [
      Validators.required
    ]);

    this.selectCiutatForm = this.formBuilder.group({
      admin: this.ciutat,
    });
  }

  ngOnInit(){
    const auth = this.usuaria();

    if(auth?.user_id){
      this.store.dispatch(CiutatsAction.getCiutatsAdministrades({ userId: auth.user_id }));
    }
    else{
      this.store.dispatch(CiutatsAction.getCiutats());
    }
  }

  submit(){
    console.log('SUBMIT!');
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere selecciona " + nom;
    }
    return "";
  }

}
