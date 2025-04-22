import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../app/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const body = {
        "email": email,
        "senha": password
       };
      console.log("body da requisição: ", body); 
      this.authService.login(body).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) =>{
          console.error(err);
        }
      })

      console.log('Login:', { email, password });
    }
  }
}


// const body = {
//   "nome": this.lojaForm.value.nome,
//   "cnpj": this.lojaForm.value.cnpj,
//   "endereco": this.lojaForm.value.endereco,
//   "cidade": this.lojaForm.value.cidade,
//   "regiaoId": this.lojaForm.value.regiaoId
//   // "usuarioId": this.lojaForm.value.usuarioId
// };

