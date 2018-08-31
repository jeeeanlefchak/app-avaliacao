import { AbstractService } from './abstract-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Nota } from '../models/nota';

@Injectable()
export class NotaService extends AbstractService<Nota> {

  constructor(http: Http) {
    super(http);
  }
  public getWebService(): string {
    return 'nota';
  }

}