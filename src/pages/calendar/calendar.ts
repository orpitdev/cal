import { Component } from '@angular/core';
import { ToastProvider } from './../../providers/toast/toast';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { CalendarProvider } from './../../providers/calendar/calendar';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

	public calendar_body;
	public loading: boolean = true;
	public loading_more: boolean = false;
	public page: number = 1;

	constructor(public navCtrl: NavController, public calendarProvider: CalendarProvider, public dbProvider: DatabaseProvider, public toastProvider: ToastProvider) {}

	ionViewDidLoad(){
		//Quando entra na página, a notícia já está concluida, portanto não precisa ficar verificando atualizações.
		this.dbProvider.addRefresh('calendar');
		this.getCalendar();
	}

	getCalendar(){
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_calendar');
			
			this.calendarProvider.get(this.page)
			.then((data: any[]) => {
				this.calendar_body = data[1]; //Body
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('calendar')
					this.loading = false;
					this.loading_more = false;
				}
			})
		}, 5000)
	}

	moreCalendar(){
		if(window.localStorage.getItem('network_status') == '1')
		{
			this.loading_more = true;
			this.page++;
			this.calendarProvider.populate(this.page)
			.then(() => {
				this.getCalendar();
			})
		}
		else
		{
			this.toastProvider.call('warning', 'Você está desconectado. Para ver mais jogos no calendário, conecte-se na internet.');
		}
	}

}
