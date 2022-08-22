import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoGameComponent } from './demo-game.component';

let routes: Routes = [
  {
    path: '',
    component: DemoGameComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoGameRoutingModule {}
