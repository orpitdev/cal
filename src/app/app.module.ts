import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { NewsPage } from '../pages/news/news';
import { PlayersPage } from './../pages/players/players';
import { ResultsPage } from './../pages/results/results';


import { ActionsComponent } from './../components/actions/actions';
import { NewsComponent } from './../components/news/news';
import { CalendarComponent } from './../components/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CalendarPage,
    NewsPage,
    PlayersPage,
    ResultsPage,
    ActionsComponent,
    NewsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CalendarPage,
    NewsPage,
    PlayersPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
