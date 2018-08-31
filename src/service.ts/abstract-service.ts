import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export abstract class AbstractService<T>{

    // http://192.168.2.106:8085/WebMobile-0.0.1-SNAPSHOT/rest/ambiente/salvar
    protected protocolo: string = 'http';
    public ip: string = 'www.devionn.com';
    public porta: string = '38180';
    protected contextSistema: string = 'WebMobile-0.0.1-SNAPSHOT/rest/';
    protected urlSistema: string = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextSistema;
    protected urlWebBase: string = '';
    
    constructor(protected http: Http) {
        this.urlWebBase = this.urlSistema + this.getWebService();
    }

    public abstract getWebService(): string;

    public findAll(): Observable<Array<T>> {
        return this.http.get(this.urlWebBase).map(res => {
            return res.json();
        });
    }

    public findById(id: number): Observable<T> {
        return this.http.get(this.urlWebBase + "/" + id).map(res => {
            return res.json();
        });
    }

    public remove(id: number): Observable<T> {
        return this.http.delete(this.urlWebBase + "/" + id).map(res => {
            return res.json();
        });
    }

    public save(obj: T): Observable<T> {
        console.log(obj);
        return this.http.post(this.urlWebBase + "/salvar", obj).map(res => {
            return res.json();
        });
    }

}

