import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { Store } from '@ngrx/store';
import { CiutatDTO } from '../../Models/ciutat.dto';
import { Ciutats } from '../../Services/ciutats';

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
export class CiutatForm {
  ciutatsService = inject(Ciutats);
  ciutats = signal<CiutatDTO[]>([]);
  idCiutatSeleccionada = signal<number | null>(null);
  ciutatSeleccionada = computed<CiutatDTO | undefined>(() => {
    return this.ciutats().find(ciutat => ciutat.id === this.idCiutatSeleccionada());
  });
  
  ciutat: FormControl;
  provincia: FormControl;
  ciutatForm: FormGroup;
  
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
      this.ciutatsService.updateCiutat(dadesCiutat).subscribe({
        next: (ciutatActualitzada) => this.idCiutatSeleccionada.set(ciutatActualitzada.id),
        error: (error) => console.error("Error al intentar actualizar la ciudad", error)
      }); 
    }
    else{
      this.ciutatsService.createCiutat(dadesForm).subscribe({
        next: (novaCiutat) => this.idCiutatSeleccionada.set(novaCiutat.id),
        error: (error) => console.error("Error al intentar crear la ciudad", error)
      });
    }
    
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }
}
