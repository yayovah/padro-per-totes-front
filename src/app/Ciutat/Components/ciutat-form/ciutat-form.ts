import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Submit } from '../../../Shared/Components/form-controls/submit/submit';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { Store } from '@ngrx/store';
import { CiutatDTO } from '../../Models/ciutat.dto';
import { Ciutats } from '../../Services/ciutats';
import { ModalService } from '../../../Shared/Components/modal/modal.service';
import { SuperadminDashService } from '../../../Home/Services/superadmin-dash.service';

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
  // Serveis injectats
  ciutatsService = inject(Ciutats);
  modalService = inject(ModalService);
  SuperadminDashService = inject(SuperadminDashService);

  // Dades de les ciutats
  ciutats = signal<CiutatDTO[]>([]);
  ciutatSeleccionada = computed(() => this.SuperadminDashService.ciutatSeleccionada());
  idCiutatSeleccionada = computed(() => this.SuperadminDashService.idCiutatSeleccionada());
  
  // Elements del formulari
  ciutat: FormControl;
  provincia: FormControl;
  ciutatForm: FormGroup;

  // Output per enviar la ciutat actualitzada al component pare 
  ciutatActualitzada = output<CiutatDTO>();
  
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

  //Funció per crear o editar la ciutat segons si hi ha una ciutat seleccionada o no.
  submit(): void {
    if (this.ciutatForm.invalid) {
      this.ciutatForm.markAllAsTouched();
      return;
    }
    const dadesForm =  {
      nom: this.ciutat.value,
      provincia: this.provincia.value,
    }
    //En cas de que hi hagi una ciutat seleccionada, s'actualitza
    if(this.idCiutatSeleccionada()){
      const dadesCiutat : CiutatDTO =  {
        ...dadesForm,
        id: this.idCiutatSeleccionada()!
      };
      this.ciutatsService.updateCiutat(dadesCiutat).subscribe({
        next: (ciutatAct) => {
          this.ciutatActualitzada.emit(ciutatAct);
          this.modalService.showModalOk("Ciudad actualizada correctamente");
        },
        error: (error) => {
          this.modalService.showModalError("Error al intentar actualizar la ciudad" , error);
        }
      }); 
    }
    //Si no hi ha ciutat seleccionada, se'n crea una de nova
    else{
      this.ciutatsService.createCiutat(dadesForm).subscribe({
        next: (novaCiutat) => {
          this.ciutatActualitzada.emit(novaCiutat);
          this.modalService.showModalOk("Ciudad creada correctamente");
        },
        error: (error) => this.modalService.showModalError("Error al intentar crear la ciudad" , error)
      });
    }
    
  }

  // Funció per mostrar missatges d'error en els camps del formulari
  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return "Se requiere rellenar el campo " + nom;
    }
    return "";
  }
}
