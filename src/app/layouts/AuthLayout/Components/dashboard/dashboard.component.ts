import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

interface Vulnerabilidade {
  nomeVulnerabilidade: string;
  severidade: string;
  descricaoDetalhada: string;
  recomendacao: string;
  pontosAfetados: string;
  cvssVector: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('barChartCanvas') chartRef!: ElementRef;
  chart!: Chart;

  topSubdominio = '';
  topVulnerabilidades: { nome: string; quantidade: number }[] = [];
  vulnerabilidades: Vulnerabilidade[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.http.get<Vulnerabilidade[]>('http://localhost:8086/api/dashboard/dashboard')
      .subscribe(data => {
        this.vulnerabilidades = data;

        const severidadeCount: { [key: string]: number } = {};
        const subdominioCount: { [key: string]: number } = {};
        const vulnerabilidadeCount: { [key: string]: number } = {};

        data.forEach(entry => {
          const { severidade, pontosAfetados, nomeVulnerabilidade } = entry;

          severidadeCount[severidade] = (severidadeCount[severidade] || 0) + 1;
          subdominioCount[pontosAfetados] = (subdominioCount[pontosAfetados] || 0) + 1;
          vulnerabilidadeCount[nomeVulnerabilidade] = (vulnerabilidadeCount[nomeVulnerabilidade] || 0) + 1;
        });

        this.topSubdominio = Object.entries(subdominioCount)
          .sort((a, b) => b[1] - a[1])[0][0];

        this.topVulnerabilidades = Object.entries(vulnerabilidadeCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([nome, quantidade]) => ({ nome, quantidade }));

        const labels = Object.keys(severidadeCount);
        const values = Object.values(severidadeCount);

        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Quantidade por Severidade',
              data: values,
              backgroundColor: ['#e01071', '#f39c12', '#2ecc71', '#3498db', '#9b59b6']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#000'
                }
              },
              title: {
                display: true,
                text: 'Distribuição por Severidade',
                color: '#000'
              }
            },
            scales: {
              x: {
                ticks: {
                  color: '#000'
                },
                grid: {
                  color: '#ccc'
                }
              },
              y: {
                ticks: {
                  color: '#000'
                },
                grid: {
                  color: '#ccc'
                }
              }
            }
          },
          plugins: [{
            id: 'whiteBackground',
            beforeDraw: (chart: any) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
          }]
        });
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
    });
  }

  gerarRelatorioVulnerabilidades() {
    return this.http.get('http://localhost:8086/api/relatorios/vulnerabilidades', {
      responseType: 'blob'
    });
  }
}
