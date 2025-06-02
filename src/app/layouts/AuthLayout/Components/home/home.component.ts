import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExploitService } from '../../../../service/exploit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentAuth {
  url: string = '';
  resultado: any;
  isLoading = false;
  errorMessage = '';

  constructor(
    private exploitService: ExploitService,
    private router: Router
  ) {}

  onSearch() {
    this.isLoading = true;
    this.errorMessage = '';
    const body = { alvo: this.url };

    this.exploitService.exploitHost(body).subscribe({
      next: (res) => {
        this.resultado = res;
        this.isLoading = false;
        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao executar exploit. Verifique a URL.';
        console.error('Erro ao executar exploit:', err);
      }
    });
  }
}