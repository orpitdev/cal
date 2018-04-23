import { SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';

import { DatabaseProvider } from './../providers/database/database';
import { ToastProvider } from './../providers/toast/toast';
import { NewsProvider } from './../providers/news/news';
import { NewsComponent } from '../components/news/news';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = null;
  
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public dbProvider: DatabaseProvider, 
    public toastProvider: ToastProvider,
    public newsProvider: NewsProvider,
    public newsComponent: NewsComponent,
    public network: Network,
  ) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      this.checkNetwork();

      //Create database
      dbProvider.createDatabase()
      .then(() => {
        //Se houve sucesso na criação do banco, popula com as informações.
        return this.populate();
      })
      .then(() => {
        //Havendo sucesso, inicia a checagem de mudanças no BD e vai pra home.
        this.checkChanges();
        this.openHomePage(splashScreen);
      })
      .catch(() => {
        //Deleta o banco de dados local caso dê erro na conexão.
        dbProvider.deleteDatabase();
        this.toastProvider.call('danger', 'Não foi possível iniciar o APP do CAL. Por favor, feche e abra-o novamente.');
      });
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = TabsPage;
  }

  private checkNetwork(){
    window.localStorage.setItem('network_status', '1');
    
    this.network.onDisconnect().subscribe(() => {
      window.localStorage.setItem('network_status', '0');
    });

    this.network.onConnect().subscribe(() => {
      window.localStorage.setItem('network_status', '1');
      this.populate();
    });
  }

  private populate(){
    this.newsProvider.populate();
  }

  private checkChanges(){
    setInterval(() => {
      this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "SELECT * FROM changes";
        return db.executeSql(sql, [])
      })
      .then((changes) => {
        if(changes.rows.length > 0)
        {
          for(var i = 0; i < changes.rows.length; i++)
          {
            let change = changes.rows.item(i)
            if(change.locale == "news")
            {
              // this.newsComponent
              // .proccess()
              // .then(() => {
              //   this.dbProvider.removeChange('news')
              // })
            }
          }
        }
      })
    }, 5000)
  }
}

