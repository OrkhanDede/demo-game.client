import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule as FormsModuleAngular,
  ReactiveFormsModule,
} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, ResetPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    FormsModuleAngular,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
})
export class AuthModule {}
