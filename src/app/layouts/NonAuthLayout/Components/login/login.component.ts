import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          
          localStorage.setItem('token', response.token);
          this.router.navigate(['/app'])

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

