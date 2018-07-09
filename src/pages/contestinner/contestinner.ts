import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ContestlistPage } from '../contestlist/contestlist';
import { RewardsPage } from '../rewards/rewards';
import { ContestselectedPage } from '../contestselected/contestselected';
import { AuthService } from '../../providers/authservice/authservice';
import { Common } from '../../providers/common';

/**
 * Generated class for the ContestinnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestinner',
  templateUrl: 'contestinner.html',
})
export class ContestinnerPage {
	challengePostId: string;
	challengePostData = {
		PostId: "",
		postCommentText : "",
		userId : "",
	};
	challengedataSet = {
		id : "",
		type : "",
		url : "",
		title : "",
		daysLeft : "",
		votes : "",
		commentCount : "",
	};
	userProfileData = {
		profilePicture: ""
	};
	comments = [];
	public resposeData: any;
	//public challengedataSet: any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public common: Common,public authService:AuthService,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	  const data = JSON.parse(localStorage.getItem('userData'));
	  this.userProfileData.profilePicture = data.userData.profilePicture;
	  this.challengePostId = navParams.get('data');
	  console.log(this.challengePostId);
	  this.challengePostData.PostId = this.challengePostId;
	  this.challengePostData.userId = data.userData.user_id;
	  this.getChallengeSpecificPostData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ContestinnerPage');
	}

	backtoContestSelected(){
		this.navCtrl.push(ContestselectedPage);
	}
	
	getChallengeSpecificPostData() {
		this.common.presentLoading();
		
		this.authService.postData(this.challengePostData, "getchallengespecificpostdata").then(
			result => {
				this.resposeData = result;
				if (this.resposeData.error == 0) {
					this.common.closeLoading();
					this.challengedataSet.id = this.resposeData.data.id;
					this.challengedataSet.type = this.resposeData.data.type;
					this.challengedataSet.url = this.resposeData.data.url;
					this.challengedataSet.title = this.resposeData.data.title;
					this.challengedataSet.daysLeft = this.resposeData.data.daysLeft;
					this.challengedataSet.votes = this.resposeData.data.votes;
					this.challengedataSet.commentCount = this.resposeData.data.commentCount;
					this.comments = this.resposeData.data.comments;
					console.log(this.challengedataSet);
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
	
	addChallengePostComment(){
		let newComment = this.challengePostData.postCommentText;
		if (newComment) {
			let loading = this.loadingCtrl.create({
				content: 'Please Wait...'
			});
			loading.present();
			
			this.authService.postData(this.challengePostData, "addchallengepostcomment").then(
				result => {
					loading.dismiss();
					this.resposeData = result;
					if (this.resposeData.error == 0) {
						this.comments = this.resposeData.message;
						//this.navCtrl.push(ContestinnerPage);
						this.presentToast("Comment added successfully!");
					} else {
						this.presentToast("Error occurs while adding post comment.");
					}
				},
				err => {
				  //Connection failed message
				  loading.dismiss();
				  this.presentToast("Error occurs while adding post comment.");
				}
			);
		} 

	}
	
	VoteChallengePost(){
		let loading = this.loadingCtrl.create({
			content: 'Please Wait...'
		});
		loading.present();
		
		this.authService.postData(this.challengePostData, "votechallengepost").then(
			result => {
				loading.dismiss();
				this.resposeData = result;
				if (this.resposeData.error == 0) {
					this.challengedataSet.votes = this.resposeData.message;
					//this.navCtrl.push(ContestinnerPage);
					this.presentToast("Voted successfully!");
				} else {
					this.presentToast("Error occurs while voting.");
				}
			},
			err => {
			  //Connection failed message
			  loading.dismiss();
			  this.presentToast("Error occurs while adding post comment.");
			}
		);	
	}
	
	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 6000,
			position: 'bottom'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
	
	getRewardsPage(){
		this.navCtrl.push(RewardsPage); 
	}
}
