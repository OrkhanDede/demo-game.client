import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
let defaultRoot = 'auth';
let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo-game',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'demo-game',
    loadChildren: () => import('./demo-game/demo-game.module').then((m) => m.DemoGameModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
