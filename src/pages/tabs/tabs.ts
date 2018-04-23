import { Component } from '@angular/core';

import { CalendarPage } from '../calendar/calendar';
import { HomePage } from '../home/home';
import { NewsPage } from './../news/news';
import { PlayersPage } from '../players/players';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabCalendar = CalendarPage;
  tabNews = NewsPage;
  tabPlayers = PlayersPage;

  constructor() {  }
}
