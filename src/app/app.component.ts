import { PlayersProvider } from './../providers/players/players';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';

import { DatabaseProvider } from './../providers/database/database';
import { ToastProvider } from './../providers/toast/toast';
import { NewsProvider } from './../providers/news/news';
import { CalendarProvider } from './../providers/calendar/calendar';
import { CategoryclubProvider } from './../providers/categoryclub/categoryclub';
import { ResultProvider } from './../providers/result/result';
import { DivisionProvider } from './../providers/division/division';

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
    public calendarProvider: CalendarProvider,
    public divisionProvider: DivisionProvider,
    public resultProvider: ResultProvider,
    public categoryClubProvider: CategoryclubProvider,
    public playersProvider: PlayersProvider,
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
    this.calendarProvider.populate();
    this.divisionProvider.populate();
    this.resultProvider.populate();
    this.categoryClubProvider.populate();
    this.playersProvider.populate();
  }
}

