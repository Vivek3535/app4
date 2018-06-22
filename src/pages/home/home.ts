import { AuthService } from '../../providers/authservice/authservice';
import { Component } from '@angular/core';
import { App, NavController, IonicPage, AlertController } from 'ionic-angular';
/*import { Storage } from '@ionic/storage';*/
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomescreenPage } from '../homescreen/homescreen';
import { FollowfriendsPage } from '../followfriends/followfriends';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public photos : any;
  public noRecords: boolean;
  public base64Image : string;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    lastCreated: ""
  };
  responseData: any;
  mediaFiles = [];
  // posts: any;

  //userPostData = {"user_id":"","token":""};
  
  constructor(public alertCtrl: AlertController, public nav: NavController, public http: Http, public app: App, public authService:AuthService, private camera : Camera) {
    const data1 = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data1.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.lastCreated = "";  
    this.noRecords = false
    //shareService.userDetails.name.getUserDataOnEveryPage();

  //  this.http.get('http://surahi.in/sfc-app/api/getallusers').map(res => res.json()).subscribe(data => {
  //      this.posts = data.data;
  //   });


}

ngOnInit() {
	this.photos = [];
}

takePhoto() {
  const options : CameraOptions = {
    quality: 50, // picture quality
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options) .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
}

deletePhoto(index) {
  let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
  confirm.present();
}

heroes = [];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    } 
  }


  deletecomnt($commnt) {
    // this.heroes.splice($commnt, 1);
    this.heroes.splice(this.heroes.indexOf($commnt),1);
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

newsfeeds(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.nav.push(HomePage);
}

followfrndsPage(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.nav.push(FollowfriendsPage);
}

}