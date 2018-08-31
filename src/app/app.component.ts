import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  // netstat -ano | findstr :5037
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage,
    private screenOrientation: ScreenOrientation) {
    // storage.get('id').then((val) => {
    //   if (val) {
    //     this.rootPage = LoginPage;
    //   } else {
    this.rootPage = HomePage;
    // this.screenOrientation.lock('LANDSCAPE_PRIMARY') ;
    // this.screenOrientation.unlock();
    console.log(this.screenOrientation.type);
    
    // }
    // });
    statusBar.hide();

    // platform.ready().then(() => {
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
  }

  ngOnInit(){
    // this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
    // })
  }
}

