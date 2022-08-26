import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private API_SERVER = "http://localhost:8080/departamentos/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllDepartmentosByPais(idPais: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+idPais)
  }

}
