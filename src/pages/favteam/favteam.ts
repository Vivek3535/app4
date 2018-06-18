import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FavteamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favteam',
  templateUrl: 'favteam.html',
})
export class FavteamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavteamPage');
  }
 backtosfcfav()
 {
   this.navCtrl.push('SfcfavPage');
 }
// backtomain()
//  {
//    this.navCtrl.push('HomescreenPage');
//  }

}
