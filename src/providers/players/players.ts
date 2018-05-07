import { HelperProvider } from './../helper/helper';
import { ToastProvider } from './../toast/toast';
import { DatabaseProvider } from './../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayersProvider {

  private API: string = 'http://calinense.com.br/api/v1'
  private source_path: string = 'http://calinense.com.br/public/cms/upload/casts/'
  private sector: string = 'casts'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider, private toastProvider: ToastProvider, private helperProvider: HelperProvider) {}

  public populate(){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/player')
        .toPromise()
        .then((result: any) => {
          if(window.localStorage.getItem('forceUpdate') == '1'){
            this.dbProvider.getDB()
                .then((db: SQLiteObject) => {
                  db.executeSql("DELETE FROM player", {})
                })
          }
          return result;
        })
        .then((result: any) => {

          var cont = 1;
          for(let i in result)
          {
            Promise.all([
              this.helperProvider.download(this.source_path + result[i].picture, result[i].picture, this.sector)
            ])
            .then((image: any) => {

              let image_player = image !== false ? image : '';

              return this.dbProvider.getDB()
                .then((db: SQLiteObject) => {
                  return db.executeSql("INSERT INTO player (`id_player`, `id_category`, `name`, `nickname`, `picture`, `number`, `birth_date`, `position`, `position_initials`, `age`, `order`) VALUES ('"+result[i].id+"', '"+result[i].category_club+"', '"+result[i].name+"', '"+result[i].nickname+"', '"+image_player+"', '"+result[i].number+"', '"+result[i].birth_date+"', '"+result[i].description+"', '"+result[i].initials+"', "+result[i].age+", "+result[i].order+")", {})
                })
            })
            .then(() => {
              console.log('Player inserido com sucesso. ID: ', result[i].id)
            })
            .catch((error) => {
              console.error('Não foi possível inserir o player (Id: '+result[i].id+'). Retorno: ', error.message)
            })
            .then(() => {
              if(cont >= result.length)
              {
                this.dbProvider.addRefresh('player');
              }
              cont++;
            })
          }

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('player');
          }
        })
        .catch((error) => {
          this.toastProvider.call('danger', 'Não foi possível atualizar o player.');
          reject();
        })
        .then(() => resolve())
      }
    })
  }


  public get(category){
    
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM `player` WHERE id_category = '"+category+"' ORDER BY `order` DESC"
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
