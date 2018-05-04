import { ToastProvider } from './../../providers/toast/toast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the AlivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alive',
  templateUrl: 'alive.html',
})
export class AlivePage {

  public loading: boolean = true;
  public loop
  public linkMinute

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastProvider: ToastProvider, public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    let count = 0;
    let loop = setInterval(() => {
      this.loading = false;
      this.linkMinute = 'http://calinense.com.br/checkAliveApp'
      if(count == 1)
      {
        clearInterval(loop)
      }
      count++;
    }, 5000)
  }
}
