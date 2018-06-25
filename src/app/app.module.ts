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
import { FollowfriendsPage } from '../pages/followfriends/followfriends';
import { ShareService } from '../app/shareservice';
import { ForgotpassPage } from '../pages/forgotpass/forgotpass';
import { ChangePasswordPage } from '../pages/changepassword/changepassword';

import {Camera} from '@ionic-native/camera';
import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';
import { Common } from '../providers/common';
import { SplitPane } from '../providers/split-pane';
 
@NgModule({
  declarations: [  
    HomescreenPage,
    MyApp, 
    Login,
    RegisterPage,
    HomePage,
    FavteamPage,
    FollowfriendsPage,
    ForgotpassPage,
    ChangePasswordPage
  ],
  imports: [ 
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
    MomentModule,
    LinkyModule
  ], 
  bootstrap: [IonicApp],
  entryComponents: [
    HomescreenPage, 
    MyApp,
    Login,
    RegisterPage,
    HomePage,
    FavteamPage,
    FollowfriendsPage,
    ForgotpassPage,
    ChangePasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Common,
    SplitPane,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ShareService
  ]
})
export class AppModule {}