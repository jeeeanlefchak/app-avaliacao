import { Empresa } from '../models/empresa';
import { AbstractService } from './abstract-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpresaService extends AbstractService<Empresa> {

  constructor(http: Http) {
    super(http);
  }
  public getWebService(): string {
    return 'empresa';
  }

  public buscarEmpresa() {
    let url = this.urlWebBase + "/buscaempresa";
    return this.http.get(url).map(res => {
      return res.json();
    });
  }

  public logar(obj) {
    let url = this.urlWebBase + '/logar';
    return this.http.post(url, obj).map(res => {
      return res.json();
    })
  }

}