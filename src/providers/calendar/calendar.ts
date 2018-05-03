import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperProvider } from './../helper/helper';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { ToastProvider } from './../toast/toast';

/*
  Generated class for the CalendarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalendarProvider {

  private db: any
  private API: string = 'http://calinense.com.br/api/v1'
  private source_path: string = 'http://calinense.com.br/public/cms/upload/club/'
  private sector: string = 'clubs'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider, private toastProvider: ToastProvider, private helperProvider: HelperProvider) {
    this.db = this.dbProvider.getDB();
  }

  public populate(page: number = 0){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/games/' + page)
        .toPromise()
        .then((result: any) => {

          var cont = 1;
          for(let i in result)
          {
            //Esse Promise.all é "diDeus"!
            Promise.all([
              this.helperProvider.download(this.source_path + result[i].times[0].logo, result[i].times[0].logo, this.sector),
              this.helperProvider.download(this.source_path + result[i].times[1].logo, result[i].times[1].logo, this.sector)
            ])
            .then((logos: any) => {

              let logo_team_1 = logos[0] !== false ? logos[0] : '';
              let logo_team_2 = logos[1] !== false ? logos[1] : '';

              return this.db
                .then((db: SQLiteObject) => {
                  return db.executeSql("INSERT INTO calendar (`id_game`, `stadium_name`, `stadium_nickname`, `date_game`, `time_game`, `goal_t1`, `goal_t2`, `championships`, `team_t1_name`, `team_t1_initials`, `team_t1_logo`, `team_t2_name`, `team_t2_initials`, `team_t2_logo`, `day_week`, `month_name`, `time_simple`) VALUES ('"+result[i].id+"', '"+result[i].name+"', '"+result[i].nickname+"', '"+result[i].data_game+"', '"+result[i].time_game+"', '"+result[i].goal_t1+"', '"+result[i].goal_t2+"', '"+result[i].description+"', '"+result[i].times[0].name+"', '"+result[i].times[0].initials+"', '"+logo_team_1+"', '"+result[i].times[1].name+"', '"+result[i].times[1].initials+"', '"+logo_team_2+"', '"+result[i].day_week+"', '"+result[i].month_name+"', '"+result[i].time_simple+"')", {})
                })
            })
            .then(() => {
              console.log('Calendário inserido com sucesso. ID: ', result[i].id)
            })
            .catch((error) => {
              console.error('Não foi possível inserir o calendário (Id: '+result[i].id+'). Retorno: ', error.message)
            })
            .then(() => {
              if(cont >= result.length)
              {
                this.dbProvider.addRefresh('calendar');
              }
              cont++;
            })
          }

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('calendar');
            this.toastProvider.call('success', 'Você já resgatou todos os registros :)');
          }
        })
        .catch((error) => {
          this.toastProvider.call('danger', 'Não foi possível atualizar o calendário de jogos.');
          reject();
        })
        .then(() => resolve())
      }
    })
  }


  public get(page: number = 1){
    return this.db
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM calendar WHERE date(date_game) >= date('now') ORDER BY date(date_game) ASC LIMIT ?"
      let params = [(page*10)]

			return db.executeSql(sql, params)
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let calendar_slider: any[] = [];
				let calendar_body: any[] = [];
				
				//Calendario do slider
        for (var i = 0; i < 3; i++) {
          let item = data.rows.item(i);

          if(item)
          calendar_slider.push(item);
				}
				
				//Calendario do body
        for (var j = 0; j < data.rows.length; j++) {
          let item = data.rows.item(j);

          if(item)
          calendar_body.push(item);
				}
				
				return [calendar_slider, calendar_body];
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }

}
