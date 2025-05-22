import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExploitService } from '../../../../service/exploit.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentAuth  {
  url: string = '';
  resultado: any;

constructor (private exploitService: ExploitService){}

  onSearch() {

    const body = {
    alvo: this.url
  };


   this.exploitService.exploitHost(body).subscribe({
    next: (res) => {
      this.resultado = res
      console.log('Resultado do exploit:', res);

    },
    error: (err) => {
      console.error('Erro ao executar exploit:', err);
    }
  });




  }
}