import { Component, computed, inject } from '@angular/core';
import { Auth } from '../../../Auth/Services/auth';
import { ModalService } from '../../../Shared/Components/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(Auth);
  private modalService = inject(ModalService);
  private router = inject(Router);
  
  acreditat = computed(()=> this.authService.credentials()? true : false);

  logout() {
    this.authService.logout();  
  }

  login() {
    this.modalService.showModalInfo("Aqui el login", "Login");
  }

  inici() {
    this.router.navigate(['/']);
  }
}
