import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../providers/authservice/authservice';
import { VideoPlayer } from '@ionic-native/video-player';
/**
 * Generated class for the CreatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {
	public imageFileName:any;
	public userDetails: any;
	public responseData: any;
	public base64Image : string;
	public userPostData = {
		user_id: "",
		feed: "",
		latitude: "",
		longitude: "",
		media_url: "",
		description:"",
		tagged: "",
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private camera : Camera,public loadingCtrl: LoadingController,private transfer: FileTransfer,private geolocation: Geolocation, public authService:AuthService,private videoPlayer: VideoPlayer) {
		const data = JSON.parse(localStorage.getItem('userData'));
		this.userDetails = data.userData;
		this.userPostData.user_id = this.userDetails.user_id;
		
		this.userPostData.feed = "";
		this.userPostData.latitude = "";
		this.userPostData.longitude = "";
		this.userPostData.media_url = "http://sfc.dimensiongraphic.com/sfc-app/api/userProfileImage/12/media/wr5k7zHB_trim.92527A95-BB29-45E9-9746-5165A8FFD249.MOV";
		this.userPostData.description = "";
		this.userPostData.tagged = "";
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreatePostPage');
	}

	takePhoto() {
	  /*const options : CameraOptions = {
		quality: 50, // picture quality
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	  }*/
		let options = {
			quality: 100,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: this.camera.DestinationType.FILE_URI,
			mediaType: this.camera.MediaType.ALLMEDIA,
		};
		this.camera.getPicture(options) .then((imageData) => {
		  /*this.base64Image = "data:image/jpeg;base64," + imageData;
		  this.posts.push(this.base64Image);
		  this.posts.reverse();*/
		  
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
			fileTransfer.upload(imageData, 'http://sfc.dimensiongraphic.com/sfc-app/api/mediaUpload.php', options11, true).then((data) => {
				/* success */
				loading.dismiss();
				this.responseData = data;
				if(this.responseData.mediURL != ""){
					this.userPostData.media_url = ""+this.responseData.mediURL+"";
					this.presentToast(this.userPostData.media_url);
					//this.presentToast("Image Uploaded successfully.");
					console.log(this.userPostData.media_url);
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
	
	getGeo(){
		this.geolocation.getCurrentPosition().then((resp) => {
			let loading = this.loadingCtrl.create({
				content: 'Please Wait...'
			});
			loading.present();
			//this.locations = resp.coords;
			this.userPostData.latitude = ""+resp.coords.latitude+"";
			this.userPostData.longitude = ""+resp.coords.longitude+"";
			loading.dismiss();
			this.presentToast("Location added successfully!");
			console.log(this.userPostData.latitude);
			console.log(this.userPostData.longitude);
			/*this.userPostData.feed = {"Latitude" : resp.coords.latitude , "Longitude" : resp.coords.longitude};
			this.authService.postData(this.userPostData, "sharegeolocation").then(
				result => {
					loading.dismiss();
					if (result) {
						this.posts.location.latitude = resp.coords.latitude;
						this.posts.location.latitude = resp.coords.longitude;
						this.presentToast("Location Shared successfully!");
					} else {
						this.presentToast("Error occurs while sharing your location.");
					}
				},
				err => {
				  //Connection failed message
				  loading.dismiss();
				  this.presentToast("Error occurs while adding post comment.");
				}
			);*/
		}).catch((error) => {
			//alert('Error getting location'+JSON.stringify(error));
			this.presentToast("Error getting location");
		});
	}
	
	tagFriends(){
		
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
}
