import { AliveProvider } from './../../providers/alive/alive';
import { ToastProvider } from './../../providers/toast/toast';
import { PlayersProvider } from './../../providers/players/players';
import { CategoryclubProvider } from './../../providers/categoryclub/categoryclub';
import { ResultProvider } from './../../providers/result/result';
import { DivisionProvider } from './../../providers/division/division';
import { DatabaseProvider } from './../../providers/database/database';
import { NewsProvider } from './../../providers/news/news';
import { CalendarProvider } from './../../providers/calendar/calendar';
import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	
	public news_slider;
	public news_body;
	public loading_news: boolean = true;

	public calendar_slider;
	public loading_calendar: boolean = true;

	public update;

	@ViewChild('myTabs') tabs: Tabs;

	constructor(
		public navCtrl: NavController, 
		public dbProvider: DatabaseProvider,
		public newsProvider: NewsProvider, 
		public calendarProvider: CalendarProvider,
		public divisionProvider: DivisionProvider,
		public resultProvider: ResultProvider,
		public categoryClubProvider: CategoryclubProvider,
		public playersProvider: PlayersProvider,
		public aliveProvider: AliveProvider,
		public toast: ToastProvider
	) {}

	ionViewDidLoad(){
		this.getNews();
		this.getCalendar();
		this.checkAlive();
	}

	getNews(){
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_news');
			
			this.newsProvider.get()
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
					this.loading_news = false;

					if(this.update)
					this.update.complete();
				}
			})
		}, 5000)
	}

	goToNews(){
		this.navCtrl.parent.select(3);
	}

	getCalendar(){
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_calendar');
			
			this.calendarProvider.get()
			.then((data: any[]) => {
				this.calendar_slider = data[0]; //Slider
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('calendar')
					this.loading_calendar = false;

					if(this.update)
					this.update.complete();
				}
			})
		}, 5000)
	}

	

	doUpdate(update)
	{
		this.update = update;

		window.localStorage.setItem('forceUpdate', '1')

		Promise.all([
			this.newsProvider.populate(),
			this.calendarProvider.populate(),
			this.divisionProvider.populate(),
			this.resultProvider.populate(),
			this.categoryClubProvider.populate(),
			this.playersProvider.populate()
		])
		.then(() => {
			this.toast.call('success', 'Suas informações foram atualizadas!')
			window.localStorage.removeItem('forceUpdate')
			this.getCalendar();
			this.getNews();
		})
	}

	checkAlive()
	{
		let loop: any;

		if(window.localStorage.getItem('network_status') == '1')
		{
			loop = setInterval(() => {
				this.aliveProvider.check()
				.then((data: any) => {
					if(data)
					{
						if(data.hasgame == '1')
						{
							console.log('oi');
						}
					}
				})
			}, 5000)
		}
		else
		{
			if(loop){
				clearInterval(loop)
			}
		}
	}
}
