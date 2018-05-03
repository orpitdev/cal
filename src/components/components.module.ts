import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions/actions';
import { NewsComponent } from './news/news';
import { CalendarComponent } from './calendar/calendar';
import { NodataComponent } from './nodata/nodata';
@NgModule({
	declarations: [
        ActionsComponent,
        NewsComponent,
        CalendarComponent,
        NodataComponent
    ],
	imports: [],
	exports: [
        ActionsComponent,
        NewsComponent,
        CalendarComponent,
        NodataComponent
    ]
})
export class ComponentsModule {}
