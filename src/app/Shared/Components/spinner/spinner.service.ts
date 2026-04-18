import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class SpinnerService {
    showSpinner = signal(false);

    spinnerOn(): void {
        this.showSpinner.set(true);
    }

    spinnerOff(): void {
        this.showSpinner.set(false);
    }
}