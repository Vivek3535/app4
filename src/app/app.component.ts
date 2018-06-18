import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomescreenPage } from '../pages/homescreen/homescreen';
// import { Login } from '../pages/login/login';
//  import { RegisterPage } from '../pages/register/register'; 

@Component({
  templateUrl: 'app.html' 
}) 

export class MyApp {
  rootPage:any = HomescreenPage;
  // pages: Array<{title: string, component: any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
   
      splashScreen.hide();
    });
  

    // this.pages = [
    //   { title: 'Login', component: Login },
    //   { title: 'Register', component: RegisterPage }
    // ];

  }

}