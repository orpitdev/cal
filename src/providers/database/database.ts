import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'cal.db',
      location: 'default'
    });
  }


  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(error => console.log(error));
  }

  public deleteDatabase(){
    return this.sqlite.deleteDatabase({
      name: 'cal.db',
      location: 'default'
    });
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS `news` (`id`	INTEGER PRIMARY KEY AUTOINCREMENT, `id_source` INTEGER UNIQUE, `title`	TEXT, `subtitle` TEXT, `author` TEXT, `content`	TEXT, `image`	TEXT, `image_name` TEXT, `date_time` TEXT)'],
      ['CREATE TABLE IF NOT EXISTS `changes` (`locale` TEXT UNIQUE, PRIMARY KEY(`locale`))']
    ])
      .then(() => console.log('Tables created'))
      .catch(error => console.error('Error in create tables', error));
  }

  public hasChange(locale){
    if(window.localStorage.getItem( 'update_' + locale ) == null)
    {
      this.getDB()
      .then((db: SQLiteObject) => {
        let sql = "INSERT INTO `changes` (locale) VALUES (?)"
        let params = [locale]
        return db.executeSql(sql, params)
      })
      .then(() => {
        window.localStorage.setItem( 'update_' + locale, 'true' );
        console.log('Inseriu changes:', locale);
      })
      .catch((error) => console.error(error))
    }
  }

  public removeChange(locale){
    this.getDB()
    .then((db: SQLiteObject) => {
      let sql = "DELETE FROM `changes` WHERE `locale` = ?"
      let params = [locale]
      return db.executeSql(sql, params)
    })
    .then(() => {
      window.localStorage.removeItem( 'update_' + locale );
      console.log('Removeu changes:', locale);
    })
    .catch((error) => console.error(error))
  }

}