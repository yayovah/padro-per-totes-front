import { Component, inject } from '@angular/core';
import { Auth } from '../../../Auth/Services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(Auth);

  logout() {
    this.authService.logout();  
  }
}
