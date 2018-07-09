import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RewardsPage } from '../rewards/rewards';
import { ContestlistPage } from '../contestlist/contestlist';
import { AuthService } from '../../providers/authservice/authservice';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	public resposeData: any;
	public imageFileName: any;
	public tagFriendsData: any;
	public locationlistData: any;
	userProfileData = {
		profilePicture: "",
		userName: "",
		userFollowers: "",
		userFollowersCount: "",
		userPosts: "",
		latestPost: "",
		userTeams: "",
		postMedia: "",
		postTags: "",
		postCheckedin: "",
		postText: "",
		postType: "",
	};
	userPostData = {
		user_id: "",
	};
	userLocationData = {
		Latitude: "",
		Longitude: "",
	};
	public userDetails: any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public authService:AuthService,private camera : Camera,private transfer: FileTransfer,public toastCtrl: ToastController,public geolocation: Geolocation, private alertCtrl: AlertController) {
		const data = JSON.parse(localStorage.getItem('userData'));
		this.userDetails = data.userData;
		this.userPostData.user_id = this.userDetails.user_id;
		this.getUserProfileData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	backtomain(){
		//  const root = this.app.getRootNav();
		//  root.popToRoot();
		this.navCtrl.push(HomePage);
	}
	
	getUserProfileData() {
		let loading = this.loadingCtrl.create({
			content: 'Loading Please Wait...'
		});
		loading.present();
		this.authService.postData(this.userPostData, "getuserprofiledata").then(
		result => {
		  this.resposeData = result;
		  if (this.resposeData.profileData) {
			loading.dismiss();
			/*this.dataSet = this.resposeData.feedData;
			const dataLength = this.resposeData.feedData.length;
			this.userPostData.lastCreated = this.resposeData.feedData[
			  dataLength - 1
			].created;*/
			this.userProfileData.profilePicture = this.resposeData.profileData.profilePicture;
			this.userProfileData.userName = this.resposeData.profileData.userName;
			this.userProfileData.userFollowers = this.resposeData.profileData.userFollowers;
			this.userProfileData.userFollowersCount = this.resposeData.profileData.userFollowersCount;
			this.userProfileData.userPosts = this.resposeData.profileData.userPosts;
			this.userProfileData.latestPost = this.resposeData.profileData.latestPost;
			this.userProfileData.userTeams = this.resposeData.profileData.userTeams;
		  } else {
			console.log("No access");
			loading.dismiss();
		  }
		},
		err => {
		  //Connection failed message
		  loading.dismiss();
		}
	  );
	}
	
	/* Upload Images/Videos for user post starts */
	uploadPostimgvideo(){
		const options : CameraOptions = {
			quality: 100, // picture quality
			mediaType: this.camera.MediaType.ALLMEDIA,
			destinationType : this.camera.DestinationType.FILE_URI,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
		}
		
		this.camera.getPicture(options) .then((imageData) => {
			let loading = this.loadingCtrl.create({
				content: 'Loading Please Wait...'
			});
			loading.present();
			/* Starts Preloader */
			this.imageFileName = imageData.substring(imageData.lastIndexOf('/')+1);
			const fileTransfer: FileTransferObject = this.transfer.create();
			let options11: FileUploadOptions = {
				fileKey: 'file',
				fileName: this.imageFileName,
				params : {"userData":this.userDetails.user_id},
				headers: {}
			}
			fileTransfer.upload(imageData, 'http://sfc.dimensiongraphic.com/sfc-app/api/postsUpload.php', options11, true).then((data) => {
				/* success
				/alert("success"); */
				loading.dismiss();
				this.resposeData = data;
				let mediaresponse = JSON.parse(this.resposeData.response);
				this.authService.postData(mediaresponse, "getreturndata").then(
					result => {
						this.resposeData = result;
						if(this.resposeData.postType != ""){
							this.userProfileData.postMedia = this.resposeData.postMedia;
							this.userProfileData.postType = this.resposeData.postType;
							this.presentToast("Upload Success");
						}
						else{
							this.presentToast("There was an error uploading the file, please try again!");
						}
					},
					err => {
						this.presentToast("Returned Error");
					}
				);	
			}, (err) => {
				loading.present();
				this.presentToast(JSON.stringify(err));
			});
		}, (err) => {
		  console.log(err);
		});
	}
	/* Upload Images/Videos for user post Ends */
	
	/* Get Geolocaion for user post Starts */
	getLocation(){
		let alert = this.alertCtrl.create();
		alert.setTitle('Please Select Your Location');
		this.geolocation.getCurrentPosition().then((res) => {
			let loading = this.loadingCtrl.create({
				content: 'Loading Please Wait...'
			});
			loading.present();
			this.userLocationData.Latitude = ""+res.coords.latitude+"";
			this.userLocationData.Longitude = ""+res.coords.longitude+"";
			this.authService.postData(this.userLocationData, "sharegeolocation").then(
				result => {
					this.resposeData = result;
					let locationlist = this.resposeData.geoLocation
					

				  if (this.resposeData.geoLocation) {
						Object.keys(locationlist).forEach( function(key) {
							/*console.log(r);*/
							alert.addInput({
								type: 'radio',
								label: locationlist[key],
								value: locationlist[key],
							});
							
						});

						alert.addButton('Cancel');
						alert.addButton({
							text: 'Okay',
							handler: (data: any) => {
								/*console.log('Checkbox data:', data);*/
								this.locationlistData = "";
								this.locationlistData = "At-"+data;
								//this.userProfileData.postCheckedin = "At-"+this.resposeData.geoLocation;
								this.userProfileData.postCheckedin = this.locationlistData;
							}
						});
						alert.present();
					loading.dismiss();
					// this.userProfileData.postCheckedin = "At-"+this.resposeData.geoLocation;
					// this.presentToast(this.resposeData.geoLocation);
				  } else {
					console.log("No access");
					loading.dismiss();
				  }
				},
				err => {
				  //Connection failed message
				  loading.dismiss();
				}
			);	
		}).catch((error) => {
			console.log('Error getting location', error);
		});
	}
	/* Get Geolocaion for user post Ends */
	/* Tag Friends for user post Starts */
	tagFriends() {
		let alert = this.alertCtrl.create();
		alert.setTitle('Please Select Your Friends');
		let followersData = this.userProfileData.userFollowers;
		Object.keys(followersData).forEach( function(key) {
			/*console.log(r);*/
			console.log(key);
			console.log(followersData[key].name);
			alert.addInput({
				type: 'checkbox',
				label: followersData[key].name,
				value: followersData[key].name,
			});
			
		});
		alert.addButton('Cancel');
		alert.addButton({
			text: 'Okay',
			handler: (data: any) => {
				/*console.log('Checkbox data:', data);*/
				this.tagFriendsData = "";
				data.forEach( d => {
					console.log(d);
					this.tagFriendsData  = this.tagFriendsData+d+",";
				});
				this.tagFriendsData = "With-"+this.tagFriendsData;
				this.userProfileData.postTags = this.tagFriendsData;
			}
		});

		alert.present();
	}
	/* Tag Friends for user post Starts */
	
	/* Upload user profile pic Starts */
	takePhoto() {
		const options : CameraOptions = {
			quality: 100, // picture quality
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
		}
		/*let options = {
			quality: 100,
			mediaType: this.camera.MediaType.PICTURE,
		};*/
		this.camera.getPicture(options) .then((imageData) => {
		  /*this.base64Image = "data:image/jpeg;base64," + imageData;
		  this.photos.push(this.base64Image);
		  this.photos.reverse();*/
		  
			let loading = this.loadingCtrl.create({
				content: 'Loading Please Wait...'
			});
			loading.present();
			/* Starts Preloader */
			/*this.presentToast(imageData);*/
			this.imageFileName = imageData.substring(imageData.lastIndexOf('/')+1);
			const fileTransfer: FileTransferObject = this.transfer.create();
			let options11: FileUploadOptions = {
				fileKey: 'file',
				fileName: this.imageFileName,
				params : {"userData":this.userDetails.user_id},
				headers: {}
			}
			fileTransfer.upload(imageData, 'http://sfc.dimensiongraphic.com/sfc-app/api/profilePicUpload.php', options11, true).then((data) => {
				/* success
				/alert("success"); */
				loading.dismiss();
				this.resposeData = data;
				if(this.resposeData.imageURL != ""){
					this.userProfileData.profilePicture = this.resposeData.imageURL;
					this.presentToast("Image Uploaded successfully.");
				}
				else{
					this.presentToast("There was an error uploading the file, please try again!");
				}
			}, (err) => {
				// error
				//alert("error"+JSON.stringify(err));
				loading.present();
				this.presentToast(JSON.stringify(err));
			});
		}, (err) => {
		  console.log(err);
		});
	}
	/* Upload user profile pic Ends */
	
	/* Create User Post Starts */
	createPost(){
		this.resposeData = {
			user_id: this.userPostData.user_id,
			postTags : this.userProfileData.postTags,
			postMedia : this.userProfileData.postMedia,
			postCheckedin: this.userProfileData.postCheckedin,
			postText: this.userProfileData.postText,
			postType: this.userProfileData.postType
		};
		console.log(this.resposeData);
		let loading = this.loadingCtrl.create({
			content: 'Please Wait...'
		});
		if (this.userProfileData.postText) {
		loading.present();
		this.authService.postData(this.resposeData, "createpost").then(
			result => {
			  this.resposeData = result;
			  if (this.resposeData.error == 0) {
				loading.dismiss();
				this.presentToast(this.resposeData.message);
				/*this.navCtrl.push(ProfilePage); */
				this.userProfileData.latestPost = this.resposeData.latestPost;
			  } else {
				console.log("No access");
				loading.dismiss();
				this.presentToast(this.resposeData.message);
			  }
			},
			err => {
			  //Connection failed message
			  loading.dismiss();
			}
		);
	}
	}
	/* Create User Post Ends */
	
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
	
	getchallenge(){
		this.navCtrl.push(ContestlistPage); 
	}
	
	getRewardsPage(){
		this.navCtrl.push(RewardsPage); 
	}
	
	createPostComment(){
		
	}
}
