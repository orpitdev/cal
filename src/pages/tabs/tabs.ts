import { Component } from '@angular/core';

import { CalendarPage } from '../calendar/calendar';
import { HomePage } from '../home/home';
import { NewsPage } from './../news/news';
import { PlayersPage } from '../players/players';
import { ResultsPage } from '../results/results';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabCalendar = CalendarPage;
  tabNews = NewsPage;
  tabPlayers = PlayersPage;
  tabResults = ResultsPage;

  constructor() {

  }
}
