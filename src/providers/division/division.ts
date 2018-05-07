import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';

/*
  Generated class for the DivisionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DivisionProvider {

  private API: string = 'http://calinense.com.br/api/v1'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider) {}

  public populate(page: number = 0){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/division')
        .toPromise()
        .then((result: any) => {

          var cont = 1;

          this.dbProvider.getDB()
            .then((db: SQLiteObject) => {
              db.executeSql("DELETE FROM divisions", {})
              .then(() => {
                return db;
              })
            })
            .then(() => {
              for(let i in result)
              {
                this.dbProvider.getDB()
                .then((db) => {
                  return db.executeSql("INSERT INTO divisions (`id_divisions`, `description`) VALUES ('"+result[i].id+"', '"+result[i].description+"')", {})
                })
                .then(() => {
                  console.log('Divisões inseridas com sucesso. ID: ', result[i].id)
                })
                .catch((error) => {
                  console.error('Não foi possível inserir a divisão (Id: '+result[i].id+'). Retorno: ', error.message)
                })
                .then(() => {
                  if(cont >= result.length)
                  {
                    this.dbProvider.addRefresh('division');
                  }
                  cont++;
                })
              }
            })

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('division');
          }
        })
        .catch((error) => {
          reject();
        })
        .then(() => resolve())
      }
    })
  }

  public get(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM divisions ORDER BY description ASC"
      return db.executeSql(sql, {})
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let divisions: any[] = [];
				
        for (var j = 0; j < data.rows.length; j++) {
          let item = data.rows.item(j);

          if(item)
          divisions.push(item);
				}
				
				return divisions;
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }

}
