import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalVulnerabilidades = 124;
  vulnerabilidadesPorCriticidade = {
    critica: 10,
    alta: 45,
    media: 50,
    baixa: 19
  };
  subdominioComMais = 'api.exemplo.com';

  chartBarras: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['api.exemplo.com', 'admin.exemplo.com', 'dev.exemplo.com'],
      datasets: [
        {
          label: 'Crítica',
          data: [2, 5, 3],
          backgroundColor: '#e53935'
        },
        {
          label: 'Alta',
          data: [10, 15, 20],
          backgroundColor: '#fb8c00'
        },
        {
          label: 'Média',
          data: [5, 10, 15],
          backgroundColor: '#fdd835'
        },
        {
          label: 'Baixa',
          data: [1, 3, 2],
          backgroundColor: '#43a047'
        }
      ]
    },
    options: { responsive: true }
  };

  chartPizza: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: ['Crítica', 'Alta', 'Média', 'Baixa'],
      datasets: [
        {
          data: [10, 45, 50, 19],
          backgroundColor: ['#e53935', '#fb8c00', '#fdd835', '#43a047']
        }
      ]
    },
    options: { responsive: true }
  };
}
