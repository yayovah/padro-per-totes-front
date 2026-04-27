import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { RegisterDto, UserDTO } from '../../Model/auth.dto';
import { InputEmail } from '../../../Shared/Components/form-controls/input-email/input-email';
import { InputText } from '../../../Shared/Components/form-controls/input-text/input-text';
import { ModalService } from '../../../Shared/Components/modal/modal.service';

@Component({
  selector: 'app-register',
  imports: [InputEmail, InputText, InputEmail],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  registreForm: FormGroup;

  authService = inject(Auth);
  modalService = inject(ModalService);

  constructor(
    private formBuilder: FormBuilder,
  ){
    //inicialitzem els camps del formulari: email i password
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.email = new FormControl('', [
      Validators.email,
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    //Vinculem els camps al Form
    this.registreForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
  
  submit(){
    if (this.registreForm.invalid) {
      this.registreForm.markAllAsTouched();
      return;
    }
    const credentials: RegisterDto = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.confirmPassword.value,
    };

    this.authService.registre(credentials).subscribe({
      next: () => this.modalService.showModalOk("Registro efectuado correctamente"),
      error: (error) => {
        console.error(error);
        this.modalService.showModalError(error);
      }
    })
  }

  getErrorMessage(camp : FormControl, nom : string): string {
    if(camp.hasError('required')) {
      return nom + " se requiere";
    }
    if(camp.hasError('email')){
      return nom + " tiene que ser un email válido";
    }
    if(camp.hasError('minLength')){
      return nom + " no tiene el mínimo de caracteres";
    }
    return "";
  }
}
