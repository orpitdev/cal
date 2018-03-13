import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions/actions';
import { NewsComponent } from './news/news';
import { CalendarComponent } from './calendar/calendar';
@NgModule({
	declarations: [ActionsComponent,
    NewsComponent,
    CalendarComponent],
	imports: [],
	exports: [ActionsComponent,
    NewsComponent,
    CalendarComponent]
})
export class ComponentsModule {}
