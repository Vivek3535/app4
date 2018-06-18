import { AuthService } from '../../providers/authservice/authservice';
import { Component } from '@angular/core';
import { App, NavController, IonicPage, AlertController } from 'ionic-angular';
import { HomescreenPage } from '../homescreen/homescreen';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    lastCreated: ""
  };
  responseData: any;

  //userPostData = {"user_id":"","token":""};

  constructor(public alertCtrl: AlertController, public nav: NavController, public app: App, public authService:AuthService) {
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;
  this.userPostData.user_id = this.userDetails.user_id;
  this.userPostData.token = this.userDetails.token;
  this.userPostData.lastCreated = "";
    this.noRecords = false
 

}

backToWelcome(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.nav.push(HomescreenPage);
}

logout(){
  
     localStorage.clear();
     setTimeout(() => this.backToWelcome(), 1000);
}

}