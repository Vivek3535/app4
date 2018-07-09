import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { AuthService  } from '../../providers/authservice/authservice';
import { ProfilePage } from '../profile/profile';
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
  public userDetails: any;
  public noRecords: boolean;
  resposeData : any;
  userFollowing : any;
  userdetails = [];
 newselecteduservalue = [];
  public userPostData = {
    user_id: ""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: App,public authService: AuthService) {
   this.ionViewDidLoad();
   const data1 = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data1.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.getUserFollowing();
  }


  ionViewDidLoad() {
     /*this.http.get('http://sfc.dimensiongraphic.com/sfc-app/api/getallusers').map(res => res.json()).subscribe(data => {
       this.posts = data.data;
      
      
    });*/ 
	
	this.authService.postData(this.userPostData, "getallusers").then(
		result => {
		  this.resposeData = result;
		  if (this.resposeData.data) {
			this.posts = this.resposeData.data;
		  } else {
			console.log("No access");
		  }
		},
		err => {
		  //Connection failed message
		  console.log("No access");
		}
	  );
    
  }
  
  getUserFollowing() {
  this.authService.postData(this.userPostData, "getuserfollowing").then(
    result => {
      this.resposeData = result;
      if (this.resposeData.data) {
		this.userFollowing = this.resposeData.data;
		console.log(this.userFollowing);
      } else {
        console.log("No access");
      }
    },
    err => {
      //Connection failed message
	  console.log("No access");
	  /*this.winnerData = "No Winner Found";*/
    }
  );
}

  selectedUsers:string[] = [];

  clickSelectBox(itemKey){
     const foundAt = this.selectedUsers.indexOf(itemKey);
     if (foundAt >= 0) {
        this.selectedUsers.splice(foundAt, 1);
     } else {
        this.selectedUsers.push(itemKey);
    }
    

}

followfriends() {
  
  // this.userdetails.push({"user_id" : this.userDetails.user_id}) ;
  // this.newselecteduservalue.push(this.selectedUsers);
   //this.newselecteduservalue.push(this.userdetails);
  //console.log(this.newselecteduservalue);
  var myData = ({"user_id": this.userDetails.user_id,"selectedusers": this.selectedUsers});
 
  if(myData ){
    this.authService.postData(myData, "SelectedUsers").then((result) =>{
    this.resposeData = result;
   // console.log(this.resposeData);
    if(this.resposeData){
      console.log(this.resposeData);
    this.navCtrl.push(HomePage);
  }
  else{
    //this.showAlert();
  }
    


    }, (err) => {
      //Connection failed message
    });
   }
   else{
    //this.showAlert();
   }
   
  
}


newsfeeds(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.navCtrl.push(HomePage);
}

createPost(){
	this.navCtrl.push(ProfilePage);  
}

followfrndsPage(){
  //  const root = this.app.getRootNav();
  //  root.popToRoot();
  this.navCtrl.push(FollowfriendsPage);
}
takePhoto()
{
  this.navCtrl.push(FollowfriendsPage);
}
logout()
{

}
}
