import { NewsDetailPage } from './../../pages/news-detail/news-detail';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
/**
 * Generated class for the NewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsComponent {

  @Input() public newsSlider: any[] = []
  @Input() public newsBody: any[] = []

  constructor(public navCtrl: NavController) {}

  goToDetail(id){
    this.navCtrl.push(NewsDetailPage, {id})
  }

}
