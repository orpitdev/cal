import { ResultProvider } from './../../providers/result/result';
import { DivisionProvider } from './../../providers/division/division';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-result',
	templateUrl: 'result.html',
})
export class ResultPage {

	public divisions: any[] = []
	public results: any[] = []
	public divisions_id: any
	public nodata: boolean = false
	public loading: boolean = true;
	public loading_result: boolean = false;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public dbProvider: DatabaseProvider, 
		public divisionProvider: DivisionProvider, 
		public resultProvider: ResultProvider) {}

	ionViewDidLoad(){
		this.dbProvider.addRefresh('division');
		this.getDivision();
	}

	getDivision(){
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_division');
			
			this.divisionProvider.get()
			.then((data: any[]) => {
				this.divisions = data;
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('division')
					this.loading = false;
				}
			})
		}, 5000)
	}


	getResults(id_division){
		this.loading_result = true;
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_result');
			
			this.resultProvider.get(id_division)
			.then((data: any[]) => {
				this.results = data;
				this.nodata = data.length == 0 ? true : false;
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('result')
					this.loading_result = false;
				}
			})
		}, 5000)
	}


	loadResults(id_division: any) {
		this.dbProvider.addRefresh('result');
		this.getResults(id_division);
	}
}
