import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../../service/empresa.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './cadastrar-empresa.component.html',
  styleUrl: './cadastrar-empresa.component.css'
})
export class CadastrarEmpresaComponent {


  form: FormGroup;




 constructor(private fb: FormBuilder, private router: Router, private empresaService: EmpresaService,private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const body = this.form.value;
      console.log(body)
      this.empresaService.salvarEmpresa(body).subscribe({
        next: (res) =>{
          console.log(res)
           this.snackBar.open('Empresa cadastrada com sucesso', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
              horizontalPosition: 'center',
              verticalPosition: 'top'
          });
        },
        error: (err)=>{
          console.error(err)
           this.snackBar.open('Erro ao cadastrar empresa', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      })
      console.log('Empresa cadastrada:', body);
   
    }else{
      console.log("form nao valido")
    }
  }


}
