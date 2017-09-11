import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { DuaServiceProvider } from '../../providers/dua-service/dua-service';
import { DuaConstantProvider } from '../../providers/dua-constant/dua-constant';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

const  options = {
  //ios
  //adId: 'ca-app-pub-6025676747290907~5163018690',
  //android
  adId:'ca-app-pub-6025676747290907/7445339160',
  adSize: 'SMART_BANNER',
  isTesting: false,
  autoShow: true
};
@Component({
  selector: 'dua-list',
  templateUrl: 'dua-list.html'
})


export class DuaListComponent {

  text: string;
  ahadeesListArray: any = [];
  
  platform: string;
  sizeStore: string;
  translationStore: string ="urdu";
  isFavorite: Boolean = false;
  translation: string;
   
  constructor(public navCtrl: NavController, private duaServiceProvider: DuaServiceProvider, private storage: Storage, public plt: Platform, private duaConstantProvider: DuaConstantProvider, private admobFree: AdMobFree, private socialSharing: SocialSharing ) {
    this.loadDua();
    
    
  
  }



loadDua(){
  //check for local stor
  let   options = {
    //ios
    //adId: 'ca-app-pub-6025676747290907~5163018690',
    //android
    adId:'ca-app-pub-6025676747290907/7445339160',
    adSize: 'SMART_BANNER',
    autoShow: true
  };
    this.platform = this.duaConstantProvider.device;
 
    this.storage.get('sizeStore').then((val) => {
      if (val != null){
        this.sizeStore =  val;
      }
    });

    this.storage.get('translationStore').then((val) => {
      try{
      if (val != null){
         this.translationStore =  val;
        
      }
    }
    catch(e){

    }
    });

    this.storage.get('ahadeesList').then((val) => {
     if (val == null)
      {
        this.duaServiceProvider.getAhadeesList()
        .subscribe(data => {
            this.ahadeesListArray = data['ahadees_list'][0].no;
            this.storage.set('ahadeesList', this.ahadeesListArray);
            debugger;
    
          },
        (err) => {console.log(err);
    
    
          }
        );
      }
      else
      {
        this.ahadeesListArray =  val;
      }
    });
    
    this.admobFree.banner.config(options);
  
    this.admobFree.banner.prepare()
    .then(() => {
      this.admobFree.banner.show();
    })
    .catch(e => console.log(e));
    

  
    if (this.plt.is('iphone')) {
      // This will only print when on iOS
      console.log('I am an mobile device!');
      this.duaConstantProvider.device= "small";
      this.platform = "small";
    }
    else if (this.plt.is('ipad')) {
      // This will only print when on iOS
      console.log('I am an ipad device!');
      this.duaConstantProvider.device= "large";
      this.platform = "large";
    }

    else if (this.plt.is('tablet')) {
      // This will only print when on iOS
      console.log('I am an tablet device!');
      this.duaConstantProvider.device= "large";
      this.platform = "large";
    }
    else if (this.plt.is('mobile')) {
      // This will only print when on iOS
      console.log('I am an mobile device!');
      this.duaConstantProvider.device= "small";
      this.platform = "small";
    }
    else{
      console.log('I am an browser device!');
    }
 

  }

  unFavorite(index){
    console.log(index);
    var item = this.ahadeesListArray.filter(item => item.index == index);
    item[0].favorite = false;
    this.storage.set('ahadeesList', this.ahadeesListArray);
    console.log(this.ahadeesListArray)
  }

  favorite(index){
    console.log(index);
    var item = this.ahadeesListArray.filter(item => item.index == index);
    item[0].favorite = true;
    this.storage.set('ahadeesList', this.ahadeesListArray);
    console.log(this.ahadeesListArray)
   
   
  }
  shareDUA(index){
    console.log(index);
    var item = this.ahadeesListArray.filter(item => item.index == index);
    item[0].favorite = true;
    if(this.translationStore=="urdu"){
      this.socialSharing.share(  item[0].arabic + "  " + item[0].urdu, "Ahadees " + item[0].urdu  , null); 
    }
    else{
      this.socialSharing.share(  item[0].arabic + "  " + item[0].english, "Ahadees " + item[0].english  , null); 
    }
   
  }

}

