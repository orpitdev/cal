import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';

/*
  Generated class for the CategoryclubProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryclubProvider {

  private db: any
  private API: string = 'http://calinense.com.br/api/v1'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider) {
    this.db = this.dbProvider.getDB();
  }

  public populate(page: number = 0){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/player/category')
        .toPromise()
        .then((result: any) => {

          var cont = 1;

          this.db
            .then((db: SQLiteObject) => {
              db.executeSql("DELETE FROM category_club", {})
              .then(() => {
                return db;
              })
            })
            .then(() => {
              for(let i in result)
              {
                this.db
                .then((db) => {
                  return db.executeSql("INSERT INTO category_club (`id_category_club`, `description`) VALUES ('"+result[i].id+"', '"+result[i].description+"')", {})
                })
                .then(() => {
                  console.log('Categoria de clube inserida com sucesso. ID: ', result[i].id)
                })
                .catch((error) => {
                  console.error('Não foi possível inserir a categoria de clube (Id: '+result[i].id+'). Retorno: ', error.message)
                })
                .then(() => {
                  if(cont >= result.length)
                  {
                    this.dbProvider.addRefresh('category_club');
                  }
                  cont++;
                })
              }
            })

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('category_club');
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
    return this.db
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM category_club ORDER BY description ASC"
      return db.executeSql(sql, {})
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let category_club: any[] = [];
				
        for (var j = 0; j < data.rows.length; j++) {
          let item = data.rows.item(j);

          if(item)
          category_club.push(item);
				}
				
				return category_club;
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }
}
