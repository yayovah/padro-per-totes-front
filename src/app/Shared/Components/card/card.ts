import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /* Paramtres d'entrada al component CARD */
  @Input() title?: string = '';     // Titol de la card
  @Input() subtitle?: string = '';   // Subtitol de la card
}
