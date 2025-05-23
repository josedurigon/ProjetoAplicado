import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constantes/endpoints';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {

  constructor(private http: HttpClient) {}

  
    salvarEmpresa(body: any):Observable<any>{
        return this.http.post(API_ENDPOINTS.EMPRESA.NOVA, body)
    }

}
