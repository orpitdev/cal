import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperProvider } from './../helper/helper';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { ToastProvider } from './../toast/toast';

/*
  Generated class for the ResultProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultProvider {

  private API: string = 'http://calinense.com.br/api/v1'
  private source_path: string = 'http://calinense.com.br/public/cms/upload/club/'
  private sector: string = 'clubs'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider, private toastProvider: ToastProvider, private helperProvider: HelperProvider) {}

  public populate(){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/result')
        .toPromise()
        .then((result: any) => {
          if(window.localStorage.getItem('forceUpdate') == '1'){
            this.dbProvider.getDB()
                .then((db: SQLiteObject) => {
                  db.executeSql("DELETE FROM results", {})
                })
          }
          return result;
        })
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

              return this.dbProvider.getDB()
                .then((db: SQLiteObject) => {
                  return db.executeSql("INSERT INTO results (`id_game`, `id_divisions`, `stadium_name`, `stadium_nickname`, `date_game`, `time_game`, `goal_t1`, `goal_t2`, `championships`, `team_t1_name`, `team_t1_initials`, `team_t1_logo`, `team_t2_name`, `team_t2_initials`, `team_t2_logo`, `day_week`, `month_name`, `time_simple`) VALUES ('"+result[i].id+"', '"+result[i].id_divisions+"', '"+result[i].name+"', '"+result[i].nickname+"', '"+result[i].data_game+"', '"+result[i].time_game+"', '"+result[i].goal_t1+"', '"+result[i].goal_t2+"', '"+result[i].description+"', '"+result[i].times[0].name+"', '"+result[i].times[0].initials+"', '"+logo_team_1+"', '"+result[i].times[1].name+"', '"+result[i].times[1].initials+"', '"+logo_team_2+"', '"+result[i].day_week+"', '"+result[i].month_name+"', '"+result[i].time_simple+"')", {})
                })
            })
            .then(() => {
              console.log('Resultado inserido com sucesso. ID: ', result[i].id)
            })
            .catch((error) => {
              console.error('Não foi possível inserir o resultado (Id: '+result[i].id+'). Retorno: ', error.message)
            })
            .then(() => {
              if(cont >= result.length)
              {
                this.dbProvider.addRefresh('result');
              }
              cont++;
            })
          }

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('result');
          }
        })
        .catch((error) => {
          this.toastProvider.call('danger', 'Não foi possível atualizar o resultados dos jogos.');
          reject();
        })
        .then(() => resolve())
      }
    })
  }


  public get(championships){
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM results WHERE date(date_game) < date('now') AND id_divisions = '"+championships+"' ORDER BY date(date_game) DESC"
			return db.executeSql(sql, {})
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let results: any[] = [];
			
				//Resultados
        for (var j = 0; j < data.rows.length; j++) {
          let item = data.rows.item(j);

          if(item)
          results.push(item);
				}
				
				return results;
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }

}
