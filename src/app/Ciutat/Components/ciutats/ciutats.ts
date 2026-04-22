import { Component, computed, inject, signal } from '@angular/core';
import { CiutatDTO } from '../../Models/ciutat.dto';
import { Ciutats } from '../../Services/ciutats';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciutats',
  imports: [CommonModule],
  templateUrl: './ciutats.html',
  styleUrl: './ciutats.scss',
})
export class CiutatsComponent implements OnInit {
  
  ciutatsService = inject(Ciutats);
  ciutats  = signal<CiutatDTO[]>([]);

  ngOnInit(): void {
    this.ciutatsService.getCiutats().subscribe({
      next: (ciutats) => {
        this.ciutats.set(ciutats);
      },
      error: (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    });
  }
}
