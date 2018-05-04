import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlivePage } from './alive';

@NgModule({
  declarations: [
    AlivePage,
  ],
  imports: [
    IonicPageModule.forChild(AlivePage),
  ],
})
export class AlivePageModule {}
