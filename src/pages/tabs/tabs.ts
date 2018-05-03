import { Component } from '@angular/core';

import { CalendarPage } from '../calendar/calendar';
import { HomePage } from '../home/home';
import { NewsPage } from './../news/news';
import { PlayersPage } from '../players/players';
import { ResultPage } from '../result/result';
import { AboutPage } from './../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabCalendar = CalendarPage;
  tabResults = ResultPage;
  tabNews = NewsPage;
  tabPlayers = PlayersPage;
  tabAbout = AboutPage;

  constructor() {  }
}
