import { Storage } from "@ionic/storage";

export class metodos {

    public tempoLocal: string;
    public dataLocal: Date = new Date();
    public cor : string;
    public idEmpresa : number;
    constructor(public storage : Storage) {
        this.montaTempoLocal();
        storage.get('cor').then((cor)=>{
          this.cor = cor;
        })
        this.pegaIdEmpresa();
    }

    public pegaIdEmpresa(){
        this.storage.get("idEmpresa").then((idEmpresa)=>{
            this.idEmpresa = parseInt(idEmpresa);
        })
    }

    public montaTempoLocal() {
        let date = new Date();
        this.dataLocal = date;
        let tempo = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        console.log(tempo);
        this.contaTempo(1000, tempo);
    }
    public contaTempo(time, tempo) {
        let me = this;
        setTimeout(() => {
            let hora = tempo.substring(0, 2);
            hora = parseFloat(hora);
            let minuto = tempo.substring(3, 5);
            minuto = parseInt(minuto);
            let segundos = tempo.substring(6, 8);
            segundos = parseInt(segundos);
            if (segundos >= 59) {
                segundos = -1;
                minuto = minuto + 1;
            } if (minuto >= 59) {
                minuto = 0;
                hora = hora + 1;
            } if (hora >= 23 && minuto >= 59 && segundos >= 59) {
                this.montaTempoLocal();
                return;
            }
            segundos = segundos + 1;

            if (segundos <= 9) {
                segundos = '0' + segundos;
            }
            if (minuto <= 9) {
                minuto = '0' + minuto;
            } if (hora <= 9) {
                hora = '0' + hora;
            }
            if(hora == NaN || minuto == NaN || segundos == NaN){
                this.montaTempoLocal();
                return;
            }
            let date = new Date().getSeconds;
            let data = date.toString();
            let mais10S = parseInt(data) + 10;
            let menos10S =  parseInt(data) + 10;
            if( mais10S > segundos || menos10S < segundos){
                this.montaTempoLocal();
                debugger
                return;
            }
            let tempoReal = hora + ":" + minuto + ":" + segundos;
            this.tempoLocal = tempoReal;
            me.contaTempo(1000, tempoReal)
        }, time);
    }
}