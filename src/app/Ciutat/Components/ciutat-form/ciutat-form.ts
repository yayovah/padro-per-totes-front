import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { CiutatDTO } from '../../Models/ciutat.dto';

import * as CiutatsAction from '../../Actions/ciutat.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCiutatIdSeleccionada, selectCiutats } from '../../Selectors/ciutats.selector';

@Component({
  selector: 'app-ciutat-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Submit
  ],
  templateUrl: './ciutat-form.html',
  styleUrl: './ciutat-form.scss',
})
export class CiutatForm implements OnInit {
  private store = inject(Store<AppState>);
  private ciutats = toSignal(this.store.select(selectCiutats), { initialValue: [] });
  ciutat: FormControl;
  provincia: FormControl;
  ciutatForm: FormGroup;
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });

  ciutatSeleccionada = computed<CiutatDTO | undefined>(() => {
    return this.ciutats().find(ciutat => ciutat.id === this.idCiutatSeleccionada());
  });

  constructor(  
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.ciutat = new FormControl('', [
      Validators.required
    ]);
    this.provincia = new FormControl('', [
      Validators.required
    ]);

    //Vinculem els camps al Form
    this.ciutatForm = this.formBuilder.group({
      ciutat: this.ciutat,
      provincia: this.provincia,
    });

    //Si volem editar la ciutat, les dades de la ciutat seleccionada es posen al formulari
    effect(() => {
      if(this.ciutatSeleccionada()){
        this.ciutatForm.patchValue({
          ciutat: this.ciutatSeleccionada()!.nom,
          provincia: this.ciutatSeleccionada()!.provincia
        })
      }
    });

  }

  ngOnInit(): void{

  }

  submit(): void {
    if (this.ciutatForm.invalid) {
      this.ciutatForm.markAllAsTouched();
      return;
    }
    const dadesForm =  {
      nom: this.ciutat.value,
      provincia: this.provincia.value,
    }
    if(this.idCiutatSeleccionada()){
      const dadesCiutat : CiutatDTO =  {
        ...dadesForm,
        id: this.idCiutatSeleccionada()!
      };
      this.store.dispatch(CiutatsAction.updateCiutat({ dadesCiutat }));
    }
    else{
      this.store.dispatch(CiutatsAction.createCiutat({ dadesCiutat: dadesForm }));
    }
    
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }
}
