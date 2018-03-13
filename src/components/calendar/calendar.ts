import { Component, Input } from '@angular/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {

  @Input() public raw: boolean;
  @Input() public qty: number;
  text: string
  data = [
    {
      day: '17',
      week: 'QUI',
      month: 'FEV',
      club:[
        {
          image: './assets/imgs/time_sample.png',
          tag: 'LIN'
        },
        {
          image: './assets/imgs/time2_sample.png',
          tag: 'STO'
        }
      ],
      championship: 'Campeonato Paulista 2018',
      locale: 'Estádio Municipal Gilberto Siqueira Lopes',
      hour: '16h'
    },
    {
      day: '18',
      week: 'SEX',
      month: 'FEV',
      club:[
        {
          image: './assets/imgs/time_sample.png',
          tag: 'LIN'
        },
        {
          image: './assets/imgs/time2_sample.png',
          tag: 'STO'
        }
      ],
      championship: 'Campeonato Paulista 2018',
      locale: 'Estádio Municipal Gilberto Siqueira Lopes',
      hour: '14h'
    },
    {
      day: '19',
      week: 'SAB',
      month: 'FEV',
      club:[
        {
          image: './assets/imgs/time_sample.png',
          tag: 'LIN'
        },
        {
          image: './assets/imgs/time2_sample.png',
          tag: 'STO'
        }
      ],
      championship: 'Campeonato Paulista 2018',
      locale: 'Estádio Municipal Gilberto Siqueira Lopes',
      hour: '15h'
    },
    {
      day: '02',
      week: 'SEG',
      month: 'MAR',
      club:[
        {
          image: './assets/imgs/time_sample.png',
          tag: 'LIN'
        },
        {
          image: './assets/imgs/time2_sample.png',
          tag: 'STO'
        }
      ],
      championship: 'Brasileirão 2018',
      locale: 'Estádio Municipal Gilberto Siqueira Lopes',
      hour: '18h'
    },
    {
      day: '05',
      week: 'QUI',
      month: 'FEV',
      club:[
        {
          image: './assets/imgs/time_sample.png',
          tag: 'LIN'
        },
        {
          image: './assets/imgs/time2_sample.png',
          tag: 'STO'
        }
      ],
      championship: 'Brasileirão 2018',
      locale: 'Estádio Municipal Gilberto Siqueira Lopes',
      hour: '10h'
    },
  ]

  constructor() {
  }

  ngAfterViewInit(){

  }

}
