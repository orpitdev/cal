import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the PlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private el:ElementRef, private screenOrientation: ScreenOrientation) {
    this.screenOrientation.onChange().subscribe(
      () => {
        setTimeout(() => {
          this.heightPhotoWrap()
        }, 100)
      }
    );
  }

  ionViewDidLoad() {
    this.heightPhotoWrap()
  }

  heightPhotoWrap(){
    let items = this.el.nativeElement.querySelectorAll('.photo');
    
    for(let i in items){
      if(items[i].nodeName == 'ION-COL')
      {
        var w = items[i].offsetWidth
        items[i].style.height = w + "px"
      }
    }
  }
  

}
