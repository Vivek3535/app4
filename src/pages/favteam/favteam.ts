import { Component } from '@angular/core';
import { AuthService } from '../../providers/authservice/authservice';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
  items;
  resposeData: any;
  userData = { "name": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authService: AuthService, public alertCtrl: AlertController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      {
        name: 'AR Pine Bluff',
        image: 'assets/imgs/teams-1.png',
        id: 'item1'
      },
      {
        name: 'Abil Christian',
        image: 'assets/imgs/teams-2.png',
        id: 'item2'
      },
      {
        name: 'Air Force',
        image: 'assets/imgs/teams-3.png',
        id: 'item3'
      },
      {
        name: 'Akron',
        image: 'assets/imgs/teams-4.png',
        id: 'item4'
      },
      {
        name: 'Alabama',
        image: 'assets/imgs/teams-5.png',
        id: 'item5'
      },
      {
        name: 'Alabama A&M',
        image: 'assets/imgs/teams-6.png',
        id: 'item6'
      },
      {
        name: 'Alabama State',
        image: 'assets/imgs/teams-7.png',
        id: 'item7'
      },
      {
        name: 'Albany',
        image: 'assets/imgs/teams-8.png',
        id: 'item8'
      },
      {
        name: 'Alcorn',
        image: 'assets/imgs/teams-9.png',
        id: 'item9'
      },
      {
        name: 'Mountaineers',
        image: 'assets/imgs/teams-10.png',
        id: 'item10'
      }
    ];
  }

  filterTechnologies(param: any): void {
    this.initializeItems();

    let val: string = param;

    // DON'T filter the technologies IF the supplied input is an empty string
    if (val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }

  answer: any[] = [];
  getSelectedItems(index, value, checked) {
    if (!Array.isArray(this.answer[index])) {
      this.answer[index] = [];
    }
    if (checked) {
      this.answer[index] = value
      console.log(this.answer);


    } else {
      this.answer[index].splice(1);
      console.log(this.answer);
    }
  }

  favnextPage() {
    this.navCtrl.push(HomePage);

  }

}