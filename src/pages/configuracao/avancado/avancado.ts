import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { metodos } from '../../../metodos';
import { ConfiguracaoPage } from '../configuracao';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../service.ts/funcionario-service';
@Component({
    selector: 'avancado',
    templateUrl: 'avancado.html',
    providers: [FuncionarioService]
})
export class AvancadoPage extends metodos implements OnInit {
    public senha : string = '';
    public senhaAcessar : string = 'devionn@admin';
    public senhasConferem : boolean = false;

    public ip : string;
    public porta: string;
    constructor(public navCtrl: NavController, public storage: Storage,
        public screenOrientation: ScreenOrientation, public funcionarioSerice : FuncionarioService) {
        super(storage);
    }
    ngOnInit() {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    public acessar(){
        if(this.senha == this.senhaAcessar){
            this.senhasConferem = true;
        }
    }
    public sair() {
        this.storage.remove("idEmpresa");
        this.navCtrl.setRoot(ConfiguracaoPage);
    }

    public testarConexao(){
        this.funcionarioSerice.testarConexao().subscribe((teste)=>{
            if(teste == true){
                this.storage.set('ip',this.ip);
                this.storage.set('porta', this.porta);
            }
        })
    }
}
