import { ToastProvider } from './../../providers/toast/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { NewsProvider } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'news'
})
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

	public news_slider;
	public news_body;
	public loading: boolean = true;
	public loading_more: boolean = false;
	public page: number = 1;

	constructor(public navCtrl: NavController, public newsProvider: NewsProvider, public dbProvider: DatabaseProvider, public toastProvider: ToastProvider) {}

	ionViewDidLoad(){
		//Quando entra na página, a notícia já está concluida, portanto não precisa ficar verificando atualizações.
		this.dbProvider.addRefresh('news');
		this.getNews();
	}

	getNews(){
		const loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_news');
			
			this.newsProvider.get(this.page)
			.then((data: any[]) => {
				this.news_slider = data[0]; //Slider
				this.news_body = data[1]; //Body
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('news')
					this.loading = false;
					this.loading_more = false;
				}
			})
		}, 5000)
	}

	moreNews(){
		if(window.localStorage.getItem('network_status') == '1')
		{
			this.loading_more = true;
			this.page++;
			this.newsProvider.populate(this.page)
			.then(() => {
				this.getNews();
			})
		}
		else
		{
			this.toastProvider.call('warning', 'Você está desconectado. Para ler mais notícias, conecte-se na internet.');
		}
	}
}
