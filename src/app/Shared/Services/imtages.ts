import { computed, effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { imatgeDTO } from '../Models/imatge.dto';
import { HttpClient } from '@angular/common/http';
import { LlistableDTO } from '../Models/llistable.dto';
import { ModalService } from '../Components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class Imtages{
  private modalService = inject(ModalService);
  
  private readonly baseUrl = environment.apiUrl;
  private readonly imatgesEndpoint = '/imatges';
  private readonly url = `${this.baseUrl}${this.imatgesEndpoint}`;
  private http = inject( HttpClient );

  public imatges = signal<imatgeDTO[]>([]);

  public imatgesLlistables = computed<LlistableDTO[]>(() => 
    this.imatges().map((imatge: imatgeDTO) => { return {
      id: imatge.id,
      nom: imatge.path ?? ''
    };})
  );

  constructor() {
    this.getImatges().subscribe({
      next: (imatges) => this.imatges.set(imatges),
      error: (error) => this.modalService.showModalError("Error en cargar las imatgenes del servidor.", error)
    });
  }

  getImatges(): Observable<imatgeDTO[]>{
    return this.http
    .get<imatgeDTO[]>(this.url)
    .pipe(
      catchError((error) => {
        this.modalService.showModalError('Error recuperando imagenes del servidor:', error);
        return throwError(() => new Error('Error cargando imagenes'));
      })
    );
  }

  getImatgeById(imatgeId: number): Observable<imatgeDTO>{
    return this.http
    .get<imatgeDTO>(`${this.url}/${imatgeId}`)
    .pipe(
      catchError((error) => {
        return throwError(() => new Error('Error cargando imagen'));
      })
    );
  }
}
