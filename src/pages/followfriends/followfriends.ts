import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the FollowfriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followfriends',
  templateUrl: 'followfriends.html',
})
export class FollowfriendsPage { 
  posts: any; 
  map: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: App) {
   this.ionViewDidLoad();

  }


  ionViewDidLoad() {
     this.http.get('http://surahi.in/sfc-app/api/getallusers').map(res => res.json()).subscribe(data => {
       this.posts = data.data;
    });
    
  }
  //selectedItem = [];
//   onItemClicked(posts){
//     console.log(posts);
//     this.selectedItem = posts;
//     console.log(this.selectedItem);
//  }
// onItemClicked(checked, value){
//   if(checked){
//     this.selectedItem.push(value);
//   }else{

//   }
// }
  
newsfeeds(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.navCtrl.push(HomePage);
}

followfrndsPage(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.navCtrl.push(FollowfriendsPage);
}
  
}
