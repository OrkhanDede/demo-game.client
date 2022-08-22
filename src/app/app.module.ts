import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { MatIconModule } from '@angular/material/icon';

import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { APIInterceptor } from 'src/app/APIInterceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ViewsModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      maxOpened: 1,
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  entryComponents: [],
  providers: [
    BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
      deps: [AuthService, NotifyService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
