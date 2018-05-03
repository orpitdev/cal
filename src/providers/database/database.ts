import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'cal.db',
      location: 'default'
    })
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
      ['CREATE TABLE IF NOT EXISTS `calendar` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `id_game` TEXT UNIQUE, `stadium_name` TEXT, `stadium_nickname` TEXT, `date_game` TEXT, `time_game` TEXT, `goal_t1` INTEGER, `goal_t2` INTEGER, `championships` TEXT, `team_t1_name` TEXT, `team_t1_initials` TEXT, `team_t1_logo` TEXT, `team_t2_name` TEXT, `team_t2_initials` TEXT,`team_t2_logo` TEXT, `day_week` TEXT, `month_name` TEXT, `time_simple` TEXT)'],
      ['CREATE TABLE IF NOT EXISTS `divisions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `id_divisions` TEXT UNIQUE, `description`	TEXT)'],
      ['CREATE TABLE IF NOT EXISTS `results` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `id_game` TEXT UNIQUE, `id_divisions` TEXT, `stadium_name` TEXT, `stadium_nickname` TEXT, `date_game` TEXT, `time_game` TEXT, `goal_t1` INTEGER, `goal_t2` INTEGER, `championships` TEXT, `team_t1_name` TEXT, `team_t1_initials` TEXT, `team_t1_logo` TEXT, `team_t2_name` TEXT, `team_t2_initials` TEXT,`team_t2_logo` TEXT, `day_week` TEXT, `month_name` TEXT, `time_simple` TEXT)'],
      ['CREATE TABLE IF NOT EXISTS `refresh` (`locale` TEXT UNIQUE, PRIMARY KEY(`locale`))'],
      ['CREATE TABLE IF NOT EXISTS `category_club` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `id_category_club` TEXT UNIQUE, `description` TEXT)'],
      ['CREATE TABLE IF NOT EXISTS `player` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `id_category` TEXT, `id_player` TEXT UNIQUE, `order`	INTEGER, `name` TEXT, `nickname` TEXT, `picture` TEXT, `number` INTEGER, `birth_date` TEXT, `position` TEXT, `position_initials` TEXT, `age` INTEGER)']
    ])
      .then(() => console.log('Tables created'))
      .catch(error => console.error('Error in create tables', error));
  }

  public addRefresh(locale){
    if(window.localStorage.getItem( 'refresh_' + locale ) == null)
    {
      this.getDB()
      .then((db: SQLiteObject) => {
        let sql = "INSERT INTO `refresh` (locale) VALUES (?)"
        let params = [locale]
        return db.executeSql(sql, params)
      })
      .then(() => {
        window.localStorage.setItem( 'refresh_' + locale, 'true' );
        console.log(locale, '- Concluiu a inserção da API no SQLite. Iniciar laço de atualização.');
      })
      .catch((error) => console.error(error))
    }
  }

  public removeRefresh(locale){
    this.getDB()
    .then((db: SQLiteObject) => {
      let sql = "DELETE FROM `refresh` WHERE `locale` = ?"
      let params = [locale]
      return db.executeSql(sql, params)
    })
    .then(() => {
      window.localStorage.removeItem( 'refresh_' + locale );
      console.log('Removeu', locale, 'da lista dos atualizados. Processo concluído.');
    })
    .catch((error) => console.error(error))
  }

}