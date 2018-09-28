import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmpresaService } from '../../service.ts/empresa-service';
import { Empresa } from '../../models/empresa';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage } from '../home/home';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html',
    providers: [EmpresaService]
})
export class LoginPage {
    public btnClass: boolean = false;
    public loginSenhaErrado = null;
    public empresa: Empresa = new Empresa();

    constructor(public navCtrl: NavController, public storge: Storage, public empresaService: EmpresaService,
        private screenOrientation: ScreenOrientation) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    public digitando() {
        this.loginSenhaErrado = null;
    }
    public logar() {
        this.loginSenhaErrado = null;
        this.empresaService.logar(this.empresa).subscribe((dado: Empresa) => {
            if (dado.id) {
                this.storge.set('idEmpresa', dado.id.toString());
                this.navCtrl.setRoot(HomePage);
            } else {
                this.loginSenhaErrado = "Login ou Senha errado"
            }
        })
    }
}
