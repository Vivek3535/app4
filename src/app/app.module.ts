import { HttpModule } from '@angular/http';
import { AuthService } from '../providers/authservice/authservice';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomescreenPage } from '../pages/homescreen/homescreen';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';  
import { HomePage } from '../pages/home/home';
import { FavteamPage } from '../pages/favteam/favteam';
 
@NgModule({
  declarations: [
    HomescreenPage,
    MyApp, 
    Login,
    RegisterPage,
    HomePage,
    FavteamPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
  ], 
  bootstrap: [IonicApp],
  entryComponents: [
    HomescreenPage,
    MyApp,
    Login,
    RegisterPage,
    HomePage,
    FavteamPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}