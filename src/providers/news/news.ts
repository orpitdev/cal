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

  private db: any
  private API: string = 'http://calinense.com.br/api/v1'
  private source_path: string = 'http://calinense.com.br/public/cms/upload/content/'
  private sector: string = 'news'
  private page: number = 1
  
  constructor(public http: HttpClient, private dbProvider: DatabaseProvider, private toastProvider: ToastProvider, private helperProvider: HelperProvider) {
    this.db = this.dbProvider.getDB();
  }

  public populate(){
    
    return new Promise((resolve, reject) => {
      if(window.localStorage.getItem('network_status') == '1')
      {
        this.http.get(this.API + '/news/' + this.page)
        .subscribe((result: any) => {
          for(let i in result)
          {
            this.helperProvider
              .download(this.source_path + result[i].cntnt_image, result[i].cntnt_image, this.sector)
              .then((image) => {
                if(image === false) //Sem imagem - ou deu problemas no download para o device.
                {
                  return this.db
                  .then((db: SQLiteObject) => {
                    return db.executeSql("INSERT INTO news (id_source, title, subtitle, author, content, image, image_name, date_time) VALUES ("+parseInt(result[i].cntnt_id)+", '"+result[i].cntnt_title+"', '"+result[i].cntnt_sub_title+"', '"+result[i].cntnt_font_author+"', '"+result[i].cntnt_text+"', 'no_img.jpg', '"+result[i].cntnt_image+"', '"+result[i].cntnt_date_content+"')", {})
                  })
                }
                else //Com imagem. Sucesso!
                {
                  return this.db
                  .then((db: SQLiteObject) => {
                    return db.executeSql("INSERT INTO news (id_source, title, subtitle, author, content, image, image_name, date_time) VALUES ("+parseInt(result[i].cntnt_id)+", '"+result[i].cntnt_title+"', '"+result[i].cntnt_sub_title+"', '"+result[i].cntnt_font_author+"', '"+result[i].cntnt_text+"', '"+image+"', '"+result[i].cntnt_image+"', '"+result[i].cntnt_date_content+"')", {})
                  })
                }
                
              })
              .then(() => {
								this.dbProvider.hasChange('news');
								console.log('Notícia inserida com sucesso. ID: ', result[i].cntnt_id)
              })
              .catch((error) => {
                console.error('Não foi possível inserir a notícia (Id: '+result[i].cntnt_id+'). Retorno: ', error.message)
              })
          }
          resolve(true);     
        }, (error) => {
          this.toastProvider.call('danger', 'Não foi possível atualizar as notícias.');
          reject(false)
        })
      }
    })
  }

  public get(page: number = 0, per_page: number = 10){
    return this.db
    .then((db: SQLiteObject) => {

      let sql = "SELECT * FROM news ORDER BY id_source DESC LIMIT ? OFFSET ?"
      let params = [per_page, (page*per_page)]

			return db.executeSql(sql, params)
			
    })
    .then((data: any) => {
      if (data.rows.length > 0) {

				let news_slider: any[] = [];
				let news_body: any[] = [];
				
				//News do slider
        for (var i = 0; i < 3; i++) {
          let item = data.rows.item(i);
          news_slider.push(item);
				}
				
				//News do body
        for (var j = 3; j < data.rows.length; j++) {
          let item = data.rows.item(j);
          news_body.push(item);
				}
				
				return [news_slider, news_body];
				
      } else {
        return [];
      }
		})
		.catch((e) => console.error(e));
  }
}
