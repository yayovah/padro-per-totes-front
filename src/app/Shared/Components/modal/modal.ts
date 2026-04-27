import { Component, computed, inject } from '@angular/core';
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
  modalTipe = computed(() => this.modalService.modalTipe());
  modalMessage = computed(() => this.modalService.modalMessage()); 
  
  close(): void {
    this.modalService.close();
  }
}
