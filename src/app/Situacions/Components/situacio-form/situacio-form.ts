import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { TextArea } from '../../../Shared/Components/form-controls/text-area/text-area';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { selectPreguntaIdSeleccionada, selectPreguntes, selectSituacioIdSeleccionada, selectSituacions } from '../../../Admin-dashboard/Selectors/adminDashboard.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { PreguntaDTO } from '../../../Preguntes/Models/pregunta.dto';
import * as AdminDashboardActions from '../../../Admin-dashboard/Actions/adminDashboard.action';
import { selectCiutatIdSeleccionada } from '../../../Ciutat/Selectors/ciutats.selector';
import { Select } from '../../../Shared/Components/form-controls/select/select';
import { SituacioDTO } from '../../Model/situacio.dto';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';

@Component({
  selector: 'app-situacio-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Select,
    Submit
  ],
  templateUrl: './situacio-form.html',
  styleUrl: './situacio-form.scss',
})
export class SituacioForm {
  //Store
  private store = inject(Store<AppState>);
  private preguntes = toSignal(this.store.select(selectPreguntes), { initialValue: [] });
  private situacions = toSignal(this.store.select(selectSituacions), { initialValue: [] });
  
  idPreguntaSeleccionada = toSignal(this.store.select(selectPreguntaIdSeleccionada), { initialValue: null });
  idCiutatSeleccionada = toSignal(this.store.select(selectCiutatIdSeleccionada), { initialValue: null });
  idSituacioSeleccionada = toSignal(this.store.select(selectSituacioIdSeleccionada), { initialValue: null });

  situacioSeleccionada = computed<SituacioDTO | undefined>(() => {
    return this.situacions().find(situacio => situacio.id === this.idSituacioSeleccionada());
  });

  // Creem l'array de llistables a partir de l'array de ciutats
  preguntesLlistables = computed<LlistableDTO[]>(() => 
    this.preguntes().map((pregunta: PreguntaDTO) => ({
      id: pregunta.id,
      nom: pregunta.text
    }))
  );


  //elements formulari
  resposta: FormControl;
  seguentPregunta: FormControl;
  situacioForm: FormGroup;
  

constructor(  
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.resposta = new FormControl('', [
      Validators.required
    ]);
    this.seguentPregunta = new FormControl('', [
      Validators.required
    ]);

    //Vinculem els camps al Form
    this.situacioForm = this.formBuilder.group({
      resposta: this.resposta,
      seguentPregunta: this.seguentPregunta,
    });

    //Si volem editar la pregunta, les dades de la ciutat seleccionada es posen al formulari
    effect(() => {
      if(this.situacioSeleccionada()){
        this.situacioForm.patchValue({
          resposta: this.situacioSeleccionada()!.resposta,
          seguentPregunta: this.situacioSeleccionada()!.seguent_pregunta
        })
      }
    });
  }

  submit(): void {
    if (this.situacioForm.invalid) {
      this.situacioForm.markAllAsTouched();
      return;
    }
    const dadesResposta = {
      text: this.resposta.value,
    }
    const dadesForm =  {
      seguent_preguntaId: this.seguentPregunta.value,
      ciutatId: this.idCiutatSeleccionada()!,
      preguntaId: this.idPreguntaSeleccionada()!,
    }
    if(this.idSituacioSeleccionada()){
      const dadesSituacio : any =  {
        ...dadesForm,
        id: this.idSituacioSeleccionada()!
      };
      this.store.dispatch(AdminDashboardActions.updateSituacio({ dadesSituacio }));
    }
    else{
      this.store.dispatch(AdminDashboardActions.createSituacio({ dadesSituacio: dadesForm, resposta: this.resposta.value }));
    }
    
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }

}
