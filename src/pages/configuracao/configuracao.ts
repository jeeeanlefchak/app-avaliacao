import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FuncionarioService } from '../../service.ts/funcionario-service';
import { Funcionario } from '../../models/funcionario';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
@Component({
  selector: 'configuracao',
  templateUrl: 'configuracao.html',
  providers: [FuncionarioService]
})
export class ConfiguracaoPage {
  public funcionarios: Funcionario[];
  public funcionario;
  public mostraEmpresa: boolean = false;
  public mostraVendedor: boolean = false;
  public mostraNota: boolean = false;
  public ip: string;
  public porta: number;

  constructor(public navCtrl: NavController, public funcionarioService: FuncionarioService, public storage: Storage) {
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
  }

  public salvar() {
    this.voltar();
  }

  public voltar() {
    this.navCtrl.setRoot(HomePage);
  }

  public buscaFuncionarios() {
    this.funcionarioService.buscarFuncionarios().subscribe((data: Funcionario[]) => {
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
    this.storage.set('mostraNota', event);
  }

}
