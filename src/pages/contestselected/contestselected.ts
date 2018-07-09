import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ContestinnerPage } from '../contestinner/contestinner';
import { ContestlistPage } from '../contestlist/contestlist';
import { RewardsPage } from '../rewards/rewards';
import { Common } from '../../providers/common';
import { AuthService } from '../../providers/authservice/authservice';
/**
 * Generated class for the ContestselectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestselected',
  templateUrl: 'contestselected.html',
})
export class ContestselectedPage {
  posts: any; 
  map: any;
  currentdate;
  public resposeData: any;
  lastdate;
  public challengedataSet: any;
  public noRecords: boolean;
  public userDetails: any;
  userPostData = {
    user_id: "",
    challenge: "",
    challenge_id: "",
    lastCreated: ""
  };
	userProfileData = {
		profilePicture: ""
	};
  responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public common: Common,public authService:AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.lastCreated = "";
	this.userProfileData.profilePicture = this.userDetails.profilePicture;	
    this.noRecords = false
    this.ionViewDidLoad();
    /*this.getchallengepostdata();*/
  }

  ionViewDidLoad() {
    this.http.get('http://sfc.dimensiongraphic.com/sfc-app/api/getchallenges').map(res => res.json()).subscribe(data => {
		this.posts = data.data;
		let chalangesData = this.posts;
		let challengeID : any;
		Object.keys(chalangesData).forEach( function(key) {
			challengeID = chalangesData[key].id;
		});
		this.userPostData.challenge_id = challengeID;
		this.getchallengepostdata();
    });
  }

  getchallengepostdata() {
    //this.common.presentLoading();
    
    this.authService.postData(this.userPostData, "getchallengepostdata").then(
      result => {
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.challengepostData) {
          this.common.closeLoading();
          
          this.challengedataSet = this.resposeData.challengepostData;
          
         /* const dataLength = this.resposeData.feedData.length;
          this.userPostData.lastCreated = this.resposeData.feedData[
            dataLength - 1
          ].created;*/
        } else {
          console.log("No access");
          this.common.closeLoading();
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  
gotocontestselect(id)
{
  this.navCtrl.push(ContestinnerPage, { data: id });
}
backtoselectprofile()
{
  this.navCtrl.push(ContestlistPage);

}
backtocontestlist()
{
  this.navCtrl.push(ContestlistPage);
}

	getRewardsPage(){
		this.navCtrl.push(RewardsPage); 
	}
}
