import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
let defaultRoot = 'login';
let routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
    children: [
      {
        path: 'forgotpass',
        component: ResetPasswordComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
