import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { AvancadoPage } from '../pages/configuracao/avancado/avancado';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ConfiguracaoPage,
    AvancadoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ConfiguracaoPage,
    AvancadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
  ]
})
export class AppModule {}
