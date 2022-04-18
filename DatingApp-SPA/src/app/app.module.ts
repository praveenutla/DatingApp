import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { exceptioninterceptor } from './_services/exception.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberlistsComponent } from './memberlists/memberlists.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Approutes } from './routes';

@NgModule({
  declarations: [							
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberlistsComponent,
      ListsComponent,
      MessagesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(Approutes)
  ],
  providers: [
    AuthService,
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: exceptioninterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
