import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Layout/Components/header/header';
import { Footer } from './Layout/Components/footer/footer';
import { Auth } from './Auth/Services/auth';
import { Modal } from './Shared/Components/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('padro-per-totes-front');
  private authService = inject(Auth);
}
