import { AbstractService } from './abstract-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Funcionario } from '../models/funcionario';

@Injectable()
export class FuncionarioService extends AbstractService<Funcionario> {

  constructor(http: Http) {
    super(http);
  }
  public getWebService(): string {
    return 'funcionario';
  }

  public buscarFuncionarios(idEmpresa) {
    let url = this.urlWebBase + "/funcionarios/" + idEmpresa;
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

  public testarConexao() {
    let url = this.urlWebBase + "/testeconexao";
    return this.http.get(url).map(res => {
      return res.json();
    });
  }
}