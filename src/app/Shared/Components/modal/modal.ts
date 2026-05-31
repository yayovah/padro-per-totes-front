import { Component, computed, inject, output } from '@angular/core';
import { ModalService } from './modal.service';
import { Register } from '../../../Auth/Components/Register/register';

@Component({
  selector: 'app-modal',
  imports: [Register],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  //Servei del modal
  modalService = inject(ModalService);
  //Valors del modal al Servei (tipus i meiisatge)
  modalTipo = computed(() => this.modalService.modalTipo());
  modalMissatge = computed(() => this.modalService.modalMissatge()); 
  modalTitol = computed(() => this.modalService.modalTitol()); 
  error = computed(() => this.modalService.error()); 
  botonsConfirmacio = computed(() => this.modalService.botonsConfirmacio()); 
  itinerariId = computed(() => this.modalService.itinerariId()); 

  /* Funció per tancar el modal */
  close(tipus: string = ''): void {
    //Es comprova que el tipus de moda sigui general, i que no s'estigui intentant registrar un usuari, ja que necessitem clickar als inputs
    if(!(this.itinerariId() && tipus === 'general')){
      this.modalService.closeModal();
    }
  }

  /* Funció per retornar un valor boolean al tancar el modal. Permet botons com cancelar.*/
  returnBoolean(valor: boolean): void {
    // la crida es fa com a observable, per lo que cal fer un next i un complete per tancar l'observable després de retornar el valor
    this.modalService.resultatObservable.next(valor);
    this.modalService.resultatObservable.complete();
    this.close();
  }
}
