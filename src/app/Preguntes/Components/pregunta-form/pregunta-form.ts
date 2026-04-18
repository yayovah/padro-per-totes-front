import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { TextArea } from '../../../Shared/Components/form-controls/text-area/text-area';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { selectPreguntaIdSeleccionada, selectPreguntes } from '../../../Home/Components/Admin-dashboard/Selectors/adminDashboard.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { PreguntaDTO } from '../../Models/pregunta.dto';
import * as AdminDashboardActions from '../../../Home/Components/Admin-dashboard/Actions/adminDashboard.action';
import { selectCiutatIdSeleccionada } from '../../../Ciutat/Selectors/ciutats.selector';

@Component({
  selector: 'app-pregunta-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    TextArea,
    Submit
  ],
  templateUrl: './pregunta-form.html',
  styleUrl: './pregunta-form.scss',
})
export class PreguntaForm{
  private store = inject(Store<AppState>);
  private preguntes = toSignal(this.store.select(selectPreguntes), { initialValue: [] });
  titol: FormControl;
  text: FormControl;
  preguntaForm: FormGroup;
  idPreguntaSeleccionada = toSignal(this.store.select(selectPreguntaIdSeleccionada), { initialValue: null });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });

  preguntaSeleccionada = computed<PreguntaDTO | undefined>(() => {
    return this.preguntes().find(ptegunta => ptegunta.id === this.idPreguntaSeleccionada());
  });

constructor(  
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.titol = new FormControl('', [
      Validators.required
    ]);
    this.text = new FormControl('', [
      Validators.required
    ]);

    //Vinculem els camps al Form
    this.preguntaForm = this.formBuilder.group({
      titol: this.titol,
      text: this.text,
    });

    //Si volem editar la pregunta, les dades de la ciutat seleccionada es posen al formulari
    effect(() => {
      if(this.preguntaSeleccionada()){
        this.preguntaForm.patchValue({
          titol: this.preguntaSeleccionada()!.titol,
          text: this.preguntaSeleccionada()!.text
        })
      }
    });
  }


  submit(): void {
    if (this.preguntaForm.invalid) {
      this.preguntaForm.markAllAsTouched();
      return;
    }
    const dadesForm =  {
      titol: this.titol.value,
      text: this.text.value,
    }
    if(this.idPreguntaSeleccionada()){
      const dadesPregunta : PreguntaDTO =  {
        ...dadesForm,
        id: this.idPreguntaSeleccionada()!
      };
      this.store.dispatch(AdminDashboardActions.updatePregunta({ dadesPregunta }));
    }
    else{
      this.store.dispatch(AdminDashboardActions.createPregunta({ dadesPregunta: dadesForm, ciutatId: this.idCiutatSeleccionada()! }));
    }
    
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }
}
