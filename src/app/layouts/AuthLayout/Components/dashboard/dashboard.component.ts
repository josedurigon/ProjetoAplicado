import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('barChartCanvas') chartRef!: ElementRef;
  chart!: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.http.get<any[]>('http://localhost:8086/api/dashboard/dashboard')
      .subscribe(data => {
        const contagem: { [key: string]: number } = {};

        data.forEach(vuln => {
          const sev = vuln.severidade || 'Desconhecida';
          contagem[sev] = (contagem[sev] || 0) + 1;
        });

        const labels = Object.keys(contagem);
        const values = Object.values(contagem);

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
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Vulnerabilidades por Severidade' }
            }
          }
        });
      }, error => {
        console.error('Erro ao buscar dados do dashboard:', error);
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
