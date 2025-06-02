import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExploitService } from '../../../../service/exploit.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentAuth {
  url: string = '';
  resultado: any;
  mostrarDashboard = false;
  isLoading = false;
  errorMessage = '';

  constructor(private exploitService: ExploitService,   private router: Router ) {}

  onSearch() {
    this.isLoading = true;
    this.errorMessage = '';
    const body = { alvo: this.url };

    this.exploitService.exploitHost(body).subscribe({
      next: (res) => {
        this.resultado = res;
        setTimeout(() => {
          this.isLoading = false;
          this.mostrarDashboard = true;
        }, 1000); // Delay suave para UX
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao executar exploit. Verifique a URL.';
        console.error('Erro ao executar exploit:', err);
      }
    });
  }
}
