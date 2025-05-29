import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  ngOnInit(): void {
    
  }



  constructor(private http: HttpClient) {}

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
      responseType: 'blob' // necessário para lidar com o PDF
    });
  }

}
