import { Component, ViewChild, OnInit, Input, OnChanges } from '@angular/core';
import { Slides, NavController, NavParams, ActionSheetController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media, MediaObject } from '@ionic-native/media';
import { Observable } from 'rxjs/Observable';
import { DuaServiceProvider } from '../../providers/dua-service/dua-service';
import { DuaConstantProvider } from '../../providers/dua-constant/dua-constant';



@Component({
  selector: 'favorite',
  templateUrl: 'favorite.html'
})
export class FavoriteComponent {
  
  text: string;
  ahadeesListArray: any = [];
  ahadeesListArrayAll: any = [];
  platform: string;
  sizeStore: string;
  translationStore: string = "urdu";
  isFavorite: Boolean = false;
  translation: string;
   
  constructor(public navCtrl: NavController, private duaServiceProvider: DuaServiceProvider, private storage: Storage, private duaConstantProvider: DuaConstantProvider, private socialSharing: SocialSharing ) {
    this.loadDua();

  }



loadDua(){
 
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
      if (val == null){
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
      else{
        this.ahadeesListArrayAll = val;
        this.ahadeesListArray =  val.filter(item=> item.favorite == true);
        console.log(this.ahadeesListArray);
      }
    });
    

  }

  unFavorite(index){
    var item = this.ahadeesListArrayAll .filter(item => item.index == index);
    item[0].favorite = false;
    this.storage.set('ahadeesList', this.ahadeesListArrayAll );
    console.log(this.ahadeesListArrayAll )
    this.loadDua();
  }

  favorite(index){
    var item = this.ahadeesListArrayAll .filter(item => item.index == index);
    item[0].favorite = true;
    this.storage.set('ahadeesList', this.ahadeesListArrayAll );
    console.log(this.ahadeesListArrayAll )
    this.loadDua();
   
  }
  shareDUA(index){
    var item = this.ahadeesListArrayAll .filter(item => item.index == index);
    if(this.translationStore=="urdu"){
      this.socialSharing.share(  item[0].arabic + "  " + item[0].urdu, "Ahadees " + item[0].urdu  , null); 
    }
    else{
      this.socialSharing.share(  item[0].arabic + "  " + item[0].english, "Ahadees " + item[0].english  , null); 
    }
  }

}
