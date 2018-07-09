import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProfilePage } from '../profile/profile';
import { RewardsPage } from '../rewards/rewards';
import { ContestselectedPage } from '../contestselected/contestselected';
import { AuthService } from '../../providers/authservice/authservice';
import { Common } from '../../providers/common';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the ContestlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestlist',
  templateUrl: 'contestlist.html',
})
export class ContestlistPage {
  posts: any; 
  map: any;
  public userDetails: any;
  public imageURI:any;
  public imageFileName:any;
  public resposeData: any;
  public resposePostData: any;
  public dataSet: any;
  public photos : any;
  public noRecords: boolean;
  public base64Image : string;
  userPostData = {
    user_id: "",
  };
	userProfileData = {
		profilePicture: ""
	};
  responseData: any;
  mediaFiles = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public authService:AuthService, public common: Common,public loadingCtrl: LoadingController,private camera : Camera,private transfer: FileTransfer,public toastCtrl: ToastController) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.ionViewDidLoad();
    this.getChallenges();
    this.getUserProfileData();
  }

  ionViewDidLoad() {
    this.http.get('http://sfc.dimensiongraphic.com/sfc-app/api/getchallenges').map(res => res.json()).subscribe(data => {
      this.posts = data.data;
     
    });
  }
  backtoprofile()
  {
    this.navCtrl.push(ProfilePage);
  }
  getchallenge()
  {
    this.navCtrl.push(ContestlistPage);
  }
  gotocontestlist()
  {
    this.navCtrl.push(ContestselectedPage);
  }
  getChallenges() {
    this.common.presentLoading();
    this.authService.postData(this.userPostData, "getchallegesdata").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.challengeData) {
          this.common.closeLoading();
          this.dataSet = this.resposeData.challengeData;
        } else {
          console.log("No access");
          
        }
      },
      err => {
        //Connection failed message
      }
    );
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
      this.userProfileData.profilePicture = this.resposeData.profileData.profilePicture;
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
  
  takecontentvideo() {
		const options : CameraOptions = {
			quality: 100, // picture quality
			mediaType: this.camera.MediaType.VIDEO,
			sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
		}
		this.camera.getPicture(options) .then((imageData) => {
		 
			let loading = this.loadingCtrl.create({
				content: 'Loading Please Wait...'
			});
			loading.present();
			
			this.imageFileName = imageData.substring(imageData.lastIndexOf('/')+1);
			const fileTransfer: FileTransferObject = this.transfer.create();
			let options11: FileUploadOptions = {
				fileKey: 'file',
				fileName: this.imageFileName,
				params : {"userData":this.userDetails.user_id},
				headers: {}
			}
			fileTransfer.upload(imageData, 'http://sfc.dimensiongraphic.com/sfc-app/api/postscontentUpload.php', options11, true).then((data) => {
				/* success
				/alert("success"); */
				loading.dismiss();
				this.resposeData = data;
        
				if(this.resposeData.response != ""){
					//this.userProfileData.profilePicture = this.resposeData.imageURL;
					this.presentToast(this.resposeData.message);
					this.navCtrl.push(ContestselectedPage);
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
