import { AuthService } from '../../providers/authservice/authservice';
import { Component, ViewChild } from '@angular/core';
import { App, NavController, IonicPage, AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomescreenPage } from '../homescreen/homescreen';
import { FollowfriendsPage } from '../followfriends/followfriends';
import { Common } from "../../providers/common";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild("updatebox") updatebox;
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
  
  constructor(public alertCtrl: AlertController, public nav: NavController, public http: Http, public app: App, public authService:AuthService, public common: Common, private camera : Camera) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.lastCreated = "";  
    this.noRecords = false
    this.getFeed();

}

getFeed() {
  this.common.presentLoading();
  this.authService.postData(this.userPostData, "feed").then(
    result => {
      this.resposeData = result;
      if (this.resposeData.feedData) {
        this.common.closeLoading();
        this.dataSet = this.resposeData.feedData;
        const dataLength = this.resposeData.feedData.length;
        this.userPostData.lastCreated = this.resposeData.feedData[
          dataLength - 1
        ].created;
      } else {
        console.log("No access");
      }
    },
    err => {
      //Connection failed message
    }
  );
}

feedUpdate() {
  if (this.userPostData.feed) {
    this.common.presentLoading();
    this.authService.postData(this.userPostData, "feedUpdate").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.common.closeLoading();
          this.dataSet.unshift(this.resposeData.feedData);
          this.userPostData.feed = "";
          console.log(this.resposeData.feedData);
          //this.updatebox.setFocus();
          setTimeout(() => {
            //  this.updatebox.focus();
          }, 150);
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }
}

feedDelete(feed_id, msgIndex) {
  if (feed_id > 0) {
    let alert = this.alertCtrl.create({
      title: "Delete Feed",
      message: "Do you want to buy this feed?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Delete",
          handler: () => {
            this.userPostData.feed_id = feed_id;
            this.authService.postData(this.userPostData, "feedDelete").then(
              result => {
                this.resposeData = result;
                if (this.resposeData.success) {
                  this.dataSet.splice(msgIndex, 1);
                } else {
                  console.log("No access");
                }
              },
              err => {
                //Connection failed message
              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}



doInfinite(e): Promise<any> {
  console.log("Begin async operation");
  return new Promise(resolve => {
    setTimeout(() => {
      this.authService.postData(this.userPostData, "feed").then(
        result => {
          this.resposeData = result;
          if (this.resposeData.feedData.length) {
            const newData = this.resposeData.feedData;
            this.userPostData.lastCreated = this.resposeData.feedData[
              newData.length - 1
            ].created;

            for (let i = 0; i < newData.length; i++) {
              this.dataSet.push(newData[i]);
            }
          } else {
            this.noRecords = true;
            console.log("No user updates");
          }
        },
        err => {
          //Connection failed message
        }
      );
      resolve();
    }, 500);
  });
}

converTime(time) {
  let a = new Date(time * 1000);
  return a;
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

// heroes = [];
//   addHero(newHero: string) {
//     if (newHero) {
//       this.heroes.push(newHero);
//     } 
//   }


//   deletecomnt($commnt) {
//     // this.heroes.splice($commnt, 1);
//     this.heroes.splice(this.heroes.indexOf($commnt),1);
//   }


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