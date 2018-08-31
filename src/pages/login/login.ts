import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
    public btnClass: boolean = false;

    
    constructor(public navCtrl: NavController) {

    }

}
