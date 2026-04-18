import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ModalService {
    showSpinner = signal(false);
    modalTipe = signal('');
    modalMessage = signal('');

    showModalOk(message: string): void {
        this.modalTipe.set('ok');
        this.modalMessage.set(message);
    }

    showModalError(message: string): void {
        this.modalTipe.set('error');
        this.modalMessage.set(message);
    }

    showModalInfo(message: string): void {
        this.modalTipe.set('info');
        this.modalMessage.set(message);
    }

    closeModal(): void {
        this.modalTipe.set('');
        this.modalMessage.set('');
    }
}