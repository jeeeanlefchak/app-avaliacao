import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  public ip: string = 'www.devionn.com';
  public porta : string = '38180';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    storage.get('idEmpresa').then((val) => {
      if (!val) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = HomePage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // storage.get("ip").then((res) => {
    //   if (res == null) {
    //     storage.set("ip", this.ip);
    //     storage.set('porta', this.porta);
    //   }
    // })
  }
}


