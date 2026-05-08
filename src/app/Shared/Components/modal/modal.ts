import { Component, computed, inject, output } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
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

  close(): void {
    this.modalService.closeModal();
  }

  returnBoolean(valor: boolean): void {
    this.modalService.resultatObservable.next(valor);
    this.modalService.resultatObservable.complete();
    this.close();
  }
}
