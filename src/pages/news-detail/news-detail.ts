import { DatabaseProvider } from './../../providers/database/database';
import { NewsProvider } from './../../providers/news/news';
import { ToastProvider } from './../../providers/toast/toast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  private id: number = 0
  public nodata: boolean = false;
  public loading: boolean = true;
  public news: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastProvider: ToastProvider, public newsProvider: NewsProvider, public dbProvider: DatabaseProvider) {
  }

  ionViewDidLoad() {
    if(this.navParams.get('id') > 0)
    {
      this.id = this.navParams.get('id')
      this.getNews();
    }
    else
    {
      this.nodata = true;
      this.loading = false;
      this.toastProvider.call('danger', 'Erro ao resgatar a notícia.');
    }
  }

  getNews(){
    this.newsProvider.detail(this.id)
      .then((result) => {
        if(Object.keys(result).length > 0)
        {
          this.news = result;
        }
        else{
          this.nodata = true;
          this.toastProvider.call('danger', 'Erro ao resgatar a notícia.');  
        }
      })
      .catch((error) => {
        this.nodata = true;
        this.toastProvider.call('danger', 'Erro ao resgatar a notícia.');
        console.error(error)
      })
      .then(() => {
        this.loading = false;
      })
  }

}
