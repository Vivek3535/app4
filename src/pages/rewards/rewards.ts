import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ContestlistPage } from '../contestlist/contestlist';
import { AuthService } from '../../providers/authservice/authservice';

/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
	userProfileData = {
		profilePicture: "",
		name : ""
	};
	winnerData = {
		name: "",
		user_id: "",
		profilePic: "",
		video: "",
		expire_date: "",
	};
	public resposeData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
	  const data = JSON.parse(localStorage.getItem('userData'));
	  this.userProfileData.profilePicture = data.userData.profilePicture;
	  this.userProfileData.name = data.userData.name;
	  this.getWinnerData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');
  } 
	
	backtomain(){
		//  const root = this.app.getRootNav();
		//  root.popToRoot();
		this.navCtrl.push(ProfilePage);
	}
	
	getchallenge(){
		this.navCtrl.push(ContestlistPage);
	}
	
	getWinnerData() {
		this.authService.postData(this.userProfileData, "getwinner").then(
			result => {
				this.resposeData = result;
				if (this.resposeData.data) {
					this.winnerData.name = this.resposeData.data.name;
					this.winnerData.user_id = this.resposeData.data.user_id;
					this.winnerData.profilePic = this.resposeData.data.profilePic;
					this.winnerData.video = this.resposeData.data.video;
					this.winnerData.expire_date = this.resposeData.data.expire_date;
				} else {
					console.log("No access");
					/*this.winnerData = "No Winner Found";*/
				}
			},
			err => {
				//Connection failed message
				console.log("No access");
				/*this.winnerData = "No Winner Found";*/
			}
		);
	}
}
