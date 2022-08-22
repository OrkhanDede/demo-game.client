import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './views-routing.module';
import { RouterModule } from '@angular/router';
// RECOMMENDED
import { TabsModule } from 'ngx-bootstrap/tabs';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    ViewRoutingModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
  ],
  declarations: [
  ],
})
export class ViewsModule {
  constructor() {
    console.log('view module');
  }
}
