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
  @Input() public calendarSlider: any[] = [];
  @Input() public calendarBody: any[] = [];

  constructor() {}

}
