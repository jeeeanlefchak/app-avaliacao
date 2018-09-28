import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FuncionarioService } from '../../service.ts/funcionario-service';
import { Funcionario } from '../../models/funcionario';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { metodos } from '../../metodos';
import { LoginPage } from '../login/login';
import { AvancadoPage } from './avancado/avancado';
@Component({
  selector: 'configuracao',
  templateUrl: 'configuracao.html',
  providers: [FuncionarioService]
})
export class ConfiguracaoPage extends metodos implements OnInit {
  public funcionarios: Funcionario[];
  public funcionario;
  public mostraEmpresa: boolean = false;
  public mostraVendedor: boolean = false;
  public mostraNota: boolean = false;
  public obrigatorioInformarNota :  boolean = false;
  public ip: string;
  public porta: number;

  constructor(public navCtrl: NavController, public funcionarioService: FuncionarioService, public storage: Storage,
    public screenOrientation: ScreenOrientation) {
    super(storage);
    this.buscaFuncionarios();
    this.storage.get('mostraEmpresa').then((val) => {
      this.mostraEmpresa = val;
    });
    this.storage.get('mostraVendedor').then((val) => {
      this.mostraVendedor = val;
    });
    this.storage.get('mostraNota').then((val) => {
      this.mostraNota = val;
    });
    this.storage.get('obrigatorioInformarNota').then((val) => {
      this.obrigatorioInformarNota = val;
    });
  }
  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  public salvar() {
    this.voltar();
  }

  public voltar() {
    this.navCtrl.setRoot(HomePage);
  }

  public avancado(){
    this.navCtrl.setRoot(AvancadoPage);
  }

  public sair(){
    this.storage.remove("idEmpresa");
    this.navCtrl.setRoot(LoginPage);

  }
  public buscaFuncionarios() {
    this.storage.get("idEmpresa").then((idEmpresa) => {
      idEmpresa = parseInt(idEmpresa);
      this.funcionarioService.buscarFuncionarios(this.idEmpresa).subscribe((data: Funcionario[]) => {
        this.funcionarios = data;
        this.storage.get('codVendedor').then((val) => {
          console.log('Your age is', val);
          for (let i of this.funcionarios) {
            if (i.id.toString() == val) {
              this.funcionario = i.nome;
              break;
            }
          }
        });
        console.log(data)
      })
    })
  }

  public selecionaFuncionario(fun) {
    for (let i of this.funcionarios) {
      if (i.nome == fun) {
        this.storage.set('codVendedor', i.id.toString());
        break;
      }
    }
  }

  public empresa(event) {
    this.mostraEmpresa = event;
    this.storage.set('mostraEmpresa', event);
  }

  public vendedor(event) {
    this.mostraVendedor = event;
    this.storage.set('mostraVendedor', event);
  }

  public nota(event) {
    this.mostraNota = event;
    if(!event)this.obrigatorioNota(false)
    this.storage.set('mostraNota', event);
  }

  public obrigatorioNota(event){
    this.obrigatorioInformarNota = event;
    this.storage.set('obrigatorioInformarNota', event);
  }
}
