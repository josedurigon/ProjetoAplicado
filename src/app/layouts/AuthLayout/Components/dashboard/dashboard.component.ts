import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalVulnerabilidades = 0;
  subdominioComMais = '';
  subdominioComMaisCriticas = '';

  readonly criticidades: Array<'critica' | 'alta' | 'media' | 'baixa' | 'desconhecida'> = ['critica', 'alta', 'media', 'baixa', 'desconhecida'];

  vulnerabilidadesPorCriticidade: Record<'critica' | 'alta' | 'media' | 'baixa' | 'desconhecida', number> = {
    critica: 0,
    alta: 0,
    media: 0,
    baixa: 0,
    desconhecida: 0
  };

  chartBarras: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: { responsive: true }
  };

  chartPizza: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: ['Crítica', 'Alta', 'Média', 'Baixa', 'Desconhecida'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#9e9e9e']
        }
      ]
    },
    options: { responsive: true }
  };

  chartRadar: ChartConfiguration<'radar'> = {
    type: 'radar',
    data: {
      labels: ['Crítica', 'Alta', 'Média', 'Baixa', 'Desconhecida'],
      datasets: [
        {
          label: 'Distribuição de Severidade',
          data: [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(30, 136, 229, 0.2)',
          borderColor: 'rgba(30, 136, 229, 1)',
          pointBackgroundColor: 'rgba(30, 136, 229, 1)'
        }
      ]
    },
    options: { responsive: true }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.http.get<any>('http://localhost:8086/api/dashboard/dashboard').subscribe(data => {
      this.totalVulnerabilidades = data.totalVulnerabilidades;
      this.subdominioComMais = data.subdominioComMais;

      const criticidadesPadrao = ['critica', 'alta', 'media', 'baixa', 'desconhecida'];

      this.vulnerabilidadesPorCriticidade = {
        critica: data.vulnerabilidadesPorCriticidade['critica'] || 0,
        alta: data.vulnerabilidadesPorCriticidade['alta'] || 0,
        media: data.vulnerabilidadesPorCriticidade['media'] || 0,
        baixa: data.vulnerabilidadesPorCriticidade['baixa'] || 0,
        desconhecida: data.vulnerabilidadesPorCriticidade['desconhecida'] || 0
      };

      // Pizza
      this.chartPizza.data.datasets[0].data = criticidadesPadrao.map(sev => data.vulnerabilidadesPorCriticidade[sev] || 0);

      // Radar
      this.chartRadar.data.datasets[0].data = criticidadesPadrao.map(sev => data.vulnerabilidadesPorCriticidade[sev] || 0);

      // Barras
      this.chartBarras.data.labels = Object.keys(data.vulnerabilidadesPorSubdominio);

      const cores = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#9e9e9e'];
      this.chartBarras.data.datasets = criticidadesPadrao.map((nivel, i) => ({
        label: nivel.charAt(0).toUpperCase() + nivel.slice(1),
        data: Object.values(data.vulnerabilidadesPorSubdominio).map((sd: any) => sd[nivel] || 0),
        backgroundColor: cores[i]
      }));

      // Subdomínio com mais críticas
      let maior = 0;
      let subCritico = '';
      for (let sub in data.vulnerabilidadesPorSubdominio) {
        const criticas = data.vulnerabilidadesPorSubdominio[sub]['critica'] || 0;
        if (criticas > maior) {
          maior = criticas;
          subCritico = sub;
        }
      }
      this.subdominioComMaisCriticas = subCritico;
    });
  }

  emitirRelatorio() {
    this.gerarRelatorioVulnerabilidades().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio-vulnerabilidades.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, err => {
      console.error('Erro ao baixar relatório', err);
    });
  }

  gerarRelatorioVulnerabilidades() {
    return this.http.get('http://localhost:8086/api/relatorios/vulnerabilidades', {
      responseType: 'blob'
    });
  }
}
