import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {}

  public call(type, msg, time = 10000, position = 'top'){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: position,
      cssClass: type,
      showCloseButton: true,
      closeButtonText: 'X'
    });
    toast.present();
  }

}
