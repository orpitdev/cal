import { HelperProvider } from './../helper/helper';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { HttpClient } from '@angular/common/http';
import { ToastProvider } from './../toast/toast';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  private API: string = 'http://calinense.com.br/api/v1'
  private source_path: string = 'http://calinense.com.br/public/cms/upload/content/'
  private sector: string = 'news'
  
  constructor(public http: HttpClient, private dbProvider: DatabaseProvider, private toastProvider: ToastProvider, private helperProvider: HelperProvider) {}

  public populate(page: number = 0){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/news/' + page)
        .toPromise()
        .then((result: any) => {
          if(window.localStorage.getItem('forceUpdate') == '1'){
            this.dbProvider.getDB()
                .then((db: SQLiteObject) => {
                  db.executeSql("DELETE FROM news", {})
                })
          }
          return result;
        })
        .then((result: any) => {

          var cont = 1;
          
          for(let i in result)
          {
            this.helperProvider
              .download(this.source_path + result[i].cntnt_image, result[i].cntnt_image, this.sector)
              .then((image) => {
                if(image === false) //Sem imagem - ou deu problemas no download para o device.
                {
                  return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    return db.executeSql("INSERT INTO news (id_source, title, subtitle, author, content, image, image_name, date_time) VALUES ("+parseInt(result[i].cntnt_id)+", '"+result[i].cntnt_title+"', '"+result[i].cntnt_sub_title+"', '"+result[i].cntnt_font_author+"', '"+result[i].cntnt_text+"', 'no_img.jpg', '"+result[i].cntnt_image+"', '"+result[i].cntnt_date_content+"')", {})
                  })
                }
                else //Com imagem. Sucesso!
                {
                  return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    return db.executeSql("INSERT INTO news (id_source, title, subtitle, author, content, image, image_name, date_time) VALUES ("+parseInt(result[i].cntnt_id)+", '"+result[i].cntnt_title+"', '"+result[i].cntnt_sub_title+"', '"+result[i].cntnt_font_author+"', '"+result[i].cntnt_text+"', '"+image+"', '"+result[i].cntnt_image+"', '"+result[i].cntnt_date_content+"')", {})
                  })
                }
                
              })
              .then(() => {
                console.log('Notícia inserida com sucesso. ID: ', result[i].cntnt_id)
              })
              .catch((error) => {
                console.error('Não foi possível inserir a notícia (Id: '+result[i].cntnt_id+'). Retorno: ', error.message)
              })
              .then(() => {
                if(cont >= result.length)
                {
                  this.dbProvider.addRefresh('news');
                }
                cont++;
              })
          }

          //Caso result não retorne dados, adiciona um ultimo refresh para matar o processo de looping.
          if(Object.keys(result).length == 0)
          {
            this.dbProvider.addRefresh('news');
            this.toastProvider.call('success', 'Você já resgatou todos os registros :)');
          }
        })
        .catch((error) => {
          this.toastProvider.call('danger', 'Não foi possível atualizar as notícias.');
          reject();
        })
        .then(() => resolve())
      }
    })
  }

  public get(page: number = 1){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM news ORDER BY date(date_time) DESC LIMIT ?"
      let params = [(page*10)]

			return db.executeSql(sql, params)
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let news_slider: any[] = [];
				let news_body: any[] = [];
				
				//News do slider
        for (var i = 0; i < 5; i++) {
          let item = data.rows.item(i);

          if(item)
          news_slider.push(item);
				}
				
				//News do body
        for (var j = 3; j < data.rows.length; j++) {
          let item = data.rows.item(j);
          
          if(item)
          news_body.push(item);
				}
				
				return [news_slider, news_body];
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }


  public detail(id){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM news WHERE id = ? LIMIT 1"
      let params = [id]

			return db.executeSql(sql, params)
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let news = data.rows.item(0);
				return news;
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }
}
