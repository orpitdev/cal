import { DatabaseProvider } from './../../providers/database/database';
import { PlayersProvider } from './../../providers/players/players';
import { CategoryclubProvider } from './../../providers/categoryclub/categoryclub';
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
  
  public categories: any[] = []
	public players: any[] = []
	public category_id: any
	public nodata: boolean = false
	public loading: boolean = true;
  public loading_players: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private el:ElementRef, 
    private screenOrientation: ScreenOrientation, 
    public categoryClubProvider: CategoryclubProvider, 
    public playersProvider: PlayersProvider,
    public dbProvider: DatabaseProvider
  ) {
    this.screenOrientation.onChange().subscribe(
      () => {
        // setTimeout(() => {
        //   this.heightPhotoWrap()
        // }, 100)
      }
    );
  }

  ionViewDidLoad() {
    this.heightPhotoWrap()
    this.dbProvider.addRefresh('category_club');
    this.getCategories();
    
  }

  getCategories(){
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_category_club');
			
			this.categoryClubProvider.get()
			.then((data: any[]) => {
				this.categories = data;
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('category_club')
					this.loading = false;
				}
			})
		}, 5000)
  }


  getPlayers(id_category_club){
		this.loading_players = true;
		let loop = setInterval(() => {
			let refresh = window.localStorage.getItem('refresh_player');
			
			this.playersProvider.get(id_category_club)
			.then((data: any[]) => {
				this.players = data;
				this.nodata = data.length == 0 ? true : false;
			})
			.catch((error) => {
				console.error(error);
			})
			.then(() => {
				if(refresh || window.localStorage.getItem('network_status') == '0')
				{
					clearInterval(loop)
					this.dbProvider.removeRefresh('player')
					this.loading_players = false;
				}
			})
		}, 5000)
	}


	loadPlayers(id_category_club: any) {
    this.dbProvider.addRefresh('player');
		this.getPlayers(id_category_club);
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
