import { computed, Injectable, signal } from "@angular/core";
import { UserDTO } from "../../Models/user.dto";

@Injectable({ providedIn: 'root' })

export class ModalService {
    showSpinner = signal(false);
    modalTipe = signal('');
    modalMessage = signal('');

    icono = computed(() => {
        switch(this.modalTipe()){
            case 'ok':
                break;
            case 'info':
                break;
            case 'error':
                break;
            default:
                break;
        }
    }
        
    )

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

    showRegistre(): UserDTO{
        this.modalTipe.set('info');
        const message = "Registrate para poder volver a consultar toda la información o descargartela en PDF.";
        this.modalMessage.set(message);
        return registreUsuari();
    }

    registreUsuari

    closeModal(): void {
        this.modalTipe.set('');
        this.modalMessage.set('');
    }
}