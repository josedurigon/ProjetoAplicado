import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastrar-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-empresa.component.html',
  styleUrl: './cadastrar-empresa.component.css'
})
export class CadastrarEmpresaComponent {


  form: FormGroup;



 constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      regiaoId: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const body = this.form.value;
      console.log('Empresa cadastrada:', body);
      // Aqui você envia para o backend com algum service
      // this.empresaService.cadastrarEmpresa(body).subscribe(...)
    }
  }


}
