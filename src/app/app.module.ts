import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { IonicImageLoader } from 'ionic-image-loader';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { CalendarPage } from '../pages/calendar/calendar';
import { ResultPage } from './../pages/result/result';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from './../pages/news-detail/news-detail';
import { PlayersPage } from './../pages/players/players';
import { AboutPage } from './../pages/about/about';

import { ActionsComponent } from './../components/actions/actions';
import { NewsComponent } from './../components/news/news';
import { CalendarComponent } from './../components/calendar/calendar';
import { NodataComponent } from './../components/nodata/nodata';


import { DatabaseProvider } from '../providers/database/database';
import { NewsProvider } from '../providers/news/news';
import { ToastProvider } from '../providers/toast/toast';
import { HelperProvider } from '../providers/helper/helper';
import { CalendarProvider } from '../providers/calendar/calendar';
import { PlayersProvider } from '../providers/players/players';
import { ResultProvider } from '../providers/result/result';
import { DivisionProvider } from '../providers/division/division';
import { CategoryclubProvider } from '../providers/categoryclub/categoryclub';


import localePt from '@angular/common/locales/pt';
import { AliveProvider } from '../providers/alive/alive';
registerLocaleData(localePt, 'pt');


@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        CalendarPage,
        ResultPage,
        NewsPage,
        NewsDetailPage,
        PlayersPage,
        AboutPage,
        NewsComponent,
        ActionsComponent,
        CalendarComponent,
        NodataComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicImageLoader.forRoot(),
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        CalendarPage,
        ResultPage,
        NewsPage,
        NewsDetailPage,
        PlayersPage,
        AboutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        SQLite,
        DatabaseProvider,
        NewsProvider,
        HelperProvider,
        ToastProvider,
        Network,
        FileTransfer,
        CalendarComponent,
        File,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: LOCALE_ID, useValue: 'pt'},
        CalendarProvider,
        DivisionProvider,
        ResultProvider,
        ResultProvider,
        PlayersProvider,
    CategoryclubProvider,
    AliveProvider,
    ]
})
export class AppModule {}
