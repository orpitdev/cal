import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { NewsPage } from '../pages/news/news';
import { PlayersPage } from './../pages/players/players';


import { ActionsComponent } from './../components/actions/actions';
import { NewsComponent } from './../components/news/news';
import { CalendarComponent } from './../components/calendar/calendar';
import { NewsProvider } from '../providers/news/news';
import { ToastProvider } from '../providers/toast/toast';
import { Network } from '@ionic-native/network';

import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import { HelperProvider } from '../providers/helper/helper';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        CalendarPage,
        NewsPage,
        NewsComponent,
        PlayersPage,    
        ActionsComponent,
        CalendarComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        CalendarPage,
        NewsPage,
        PlayersPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        SQLite,
        DatabaseProvider,
        NewsProvider,
        NewsComponent,
        ToastProvider,
        Network,
        FileTransfer,
        File,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: LOCALE_ID, useValue: 'pt-BR'},
    HelperProvider
    ]
})
export class AppModule {}
