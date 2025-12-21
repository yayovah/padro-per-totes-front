import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LlistableDTO } from '../../../Shared/Models/llistable.dto';
import { Auth } from '../../../Auth/Services/auth';

@Component({
  selector: 'app-add-admin',
  imports: [],
  templateUrl: './add-admin.html',
  styleUrl: './add-admin.scss',
})
export class AddAdmin implements OnInit{
  private AuthService = inject(Auth);
  
  private nousAdmins = signal<any[]>([]);
  nousAdminsLlistables = computed<LlistableDTO[]>(() => 
    this.nousAdmins().map((users) => ({
      id: users.id,
      nom: users.nom
    }))
  );
  
  ngOnInit(){
    this.AuthService.getUsersByRol('admin').subscribe(
      users => this.nousAdmins.set(users)
    );   
  }
}
