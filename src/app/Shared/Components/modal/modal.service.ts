import { computed, Injectable, signal } from "@angular/core";
import { UserDTO } from "../../Models/user.dto";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ModalService {
    //showSpinner = signal<boolean>(false);
    modalTipo = signal<string>('');
    modalMissatge = signal<string>('');
    modalTitol = signal<string>('');
    botonsConfirmacio = signal<boolean>(false);
    resultatObservable = new Subject<boolean>();
    error = signal<any>('');

    showModalOk(missatge: string, titol: string ='¡Hecho!'): void {
        this.modalTipo.set('ok');
        this.modalMissatge.set(missatge);
        this.modalTitol.set(titol);
    }

    showModalError(missatge: string, error: any = '', titol: string ='¡Error!'): void {
        this.modalTipo.set('error');
        this.modalMissatge.set(missatge);
        this.modalTitol.set(titol);
        this.error.set(error);
    }

    showModalEliminar(missatge: string, titol: string ='¿Seguro que quieres eliminar?'): Observable<boolean> {
        this.modalTipo.set('delete');
        this.modalMissatge.set(missatge);
        this.modalTitol.set(titol);
        this.botonsConfirmacio.set(true);
        this.resultatObservable = new Subject<boolean>();
        return this.resultatObservable.asObservable();
    }

    showModalInfo(missatge: string, titol: string ='Información:'): void {
        this.modalTipo.set('info');
        this.modalMissatge.set(missatge);
        this.modalTitol.set(titol);
    }

    showRegistre(): UserDTO{
        this.modalTipo.set('info');
        const missatge = "Registrate para poder volver a consultar toda la información o descargartela en PDF.";
        this.modalMissatge.set(missatge);
        return this.registreUsuari();
    }

    registreUsuari(){
        let user : UserDTO = {id: 0, email : '', nom: '' };
        return user;
    }

    closeModal(): void {
        this.modalTipo.set('');
        this.modalMissatge.set('');
        this.modalTitol.set('');
        this.botonsConfirmacio.set(false);
    }
}