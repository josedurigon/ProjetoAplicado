import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../../service/empresa.service';

@Component({
  selector: 'app-cadastrar-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-empresa.component.html',
  styleUrl: './cadastrar-empresa.component.css'
})
export class CadastrarEmpresaComponent {


  form: FormGroup;



 constructor(private fb: FormBuilder, private router: Router, private empresaService: EmpresaService) {
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
        },
        error: (err)=>{
          console.error(err)
        }
      })
      console.log('Empresa cadastrada:', body);
   
    }else{
      console.log("form nao valido")
    }
  }


}
