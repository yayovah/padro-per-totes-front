import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  //Servei de l'spinner
  spinerService = inject(SpinnerService);
  
  //Valor del signal del servei SpinnerService per mostrar o ocultar l'spinner
  showSpinner = computed(() => this.spinerService.showSpinner());

}
