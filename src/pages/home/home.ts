import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { EmpresaService } from '../../service.ts/empresa-service';
import { Empresa } from '../../models/empresa';
import { metodos } from '../../metodos';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../service.ts/funcionario-service';
import { ConfiguracaoPage } from '../configuracao/configuracao';
import { Storage } from '@ionic/storage';
import { Nota } from '../../models/nota';
import { NotaService } from '../../service.ts/nota-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [EmpresaService, FuncionarioService, NotaService]
})
export class HomePage extends metodos implements OnInit {
	public empresa: Empresa = new Empresa();
	public funcionarios: Funcionario[];
	public funcionario: string;
	public vendedor: Funcionario = new Funcionario();
	public nota: Nota = new Nota();
	public numeroNota: string;
	public finalizado: boolean = false;
	public mostraVendedor: boolean = true;
	public mostraEmpresa: boolean = true;
	public mostraNota: boolean = true;
	public obrigatorioInformarNota: boolean = true;
	public mensagemObrigatorioNota: string;
	constructor(public navCtrl: NavController,
		public empresaService: EmpresaService,
		public funcionarioService: FuncionarioService,
		public storage: Storage,
		public notaService: NotaService,
		public alertCtrl: AlertController, public screenOrientation: ScreenOrientation) {
		super(storage);
		this.buscaEmpresa();
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
		})
	}
	public abrirConfiguracao() {
		this.navCtrl.setRoot(ConfiguracaoPage);
	}

	ngOnInit() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
	}

	public avalia(peso) {
		console.log(peso)
		if (this.obrigatorioInformarNota) {
			if (this.numeroNota == undefined) {
				this.mensagemObrigatorioNota = 'Informe o Numero da Nota';
				return;
			} else if (this.numeroNota.length <= 1) {
				this.mensagemObrigatorioNota = 'Informe o Numero da Nota';
				return;
			}
		}

		this.nota.nota = peso;
		this.nota.idFuncionario = this.vendedor.id;
		this.nota.numeroNota = this.numeroNota;
		if (!this.nota.idFuncionario) {
			let titulo = "Adicione um Funcionario padrão";
			let mensagem = "Deseja ir para a pagina de Configurações ?";
			let txtCancelar = "Não";
			let txtConfirmar = "Sim";
			this.showConfirm(titulo, mensagem, txtCancelar, txtConfirmar)
			return;
		}
		this.notaService.save(this.nota).subscribe((nota: Nota) => {
			this.finalizado = true;
			this.numeroNota = null;
			setTimeout(() => {
				this.finalizado = false;
			}, 2000);
		}, err => {
			this.showError(err);
			this.finalizado = false;
		})
		setTimeout(() => {
			this.finalizado = false;
		}, 2000);
	}

	public buscaFuncionarios() {
		this.storage.get("idEmpresa").then((idEmpresa) => {
			idEmpresa = parseInt(idEmpresa);
			this.funcionarioService.buscarFuncionarios(idEmpresa).subscribe((data: Funcionario[]) => {
				this.funcionarios = data;
				this.storage.get('codVendedor').then((val) => {
					for (let i of this.funcionarios) {
						if (i.id.toString() == val) {
							this.funcionario = i.nome;
							this.vendedor = i;
							break;
						}
					}
				});
			})
		})
	}

	public buscaEmpresa() {
		this.empresaService.buscarEmpresa().subscribe((empresa: Empresa) => {
			if (empresa[0].nome != null) {
				this.empresa = empresa[0];
			}
			console.log("EMPRESA", empresa);
		})
	}


	public showConfirm(titulo, mensagem, txtCancelar, txtConfirmar) {
		const confirm = this.alertCtrl.create({
			title: titulo,
			message: mensagem,
			buttons: [
				{
					text: txtCancelar,
					handler: () => {

					}
				},
				{
					text: txtConfirmar,
					handler: () => {
						this.abrirConfiguracao();
					}
				}
			]
		});
		confirm.present();
	}

	public showError(msg) {
		const alert = this.alertCtrl.create({
			title: 'Erro',
			subTitle: "Conexão com oServidor Falhou",
			buttons: ['OK']
		});
		alert.present();
	}

	public digitandoNota() {
		this.mensagemObrigatorioNota = null;
	}
}
