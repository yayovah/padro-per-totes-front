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
import { Ciutats } from '../../Services/ciutats';


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

  private storage = inject(Storage);
  private ciutatsService = inject(Ciutats);

  private usuariId = computed(() => (this.storage.getItem('userId')? );
  private usuariRol = computed(() => this.storage.getItem('userRol'));
  
  ciutats = signal<CiutatDTO[]>([]);
  idCiutatSeleccionada = signal<number | null>(null);
  

  /*
    private store = inject(Store<AppState>);
    private usuaria = toSignal(this.store.select(selectCredentials));
  */
/*
  private ciutats = toSignal(this.store.select(selectCiutats), { initialValue: [] });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null }); 
*/
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
      ciutat: this.ciutat,
    });
  }

  ngOnInit(): void {
    if(this.usuariId() && this.usuariRol() === 'admin'){
      this.ciutatsService.getCiutatsAdministrades(this.usuariId()!).subscribe((ciutats) => {
        this.ciutats.set(ciutats);
      });
    } else {
      this.ciutatsService.getCiutats().subscribe((ciutats) => {
        this.ciutats.set(ciutats);
      });
    }
  }

  /*ngOnInitREDUX(){
    const auth = this.usuaria();
    console.log("USUARIA:",auth);
    if(auth?.user_id){
      this.store.dispatch(CiutatsAction.getCiutatsAdministrades({ userId: auth.user_id }));
    }
    else{
      this.store.dispatch(CiutatsAction.getCiutats());
    }
  }*/

  submit(){
    this.idCiutatSeleccionada.set(this.ciutat.value);
//    this.store.dispatch(CiutatsAction.selectCiutat({ ciutatId: this.ciutat.value }));
//    console.log('SUBMIT!');
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere seleccionar " + nom;
    }
    return "";
  }

}
