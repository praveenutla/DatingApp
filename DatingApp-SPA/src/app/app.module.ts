import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { exceptioninterceptor } from './_services/exception.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberlistsComponent } from './members/member-lists/memberlists.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Approutes } from './routes';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberCardDetailComponent } from './members/member-card-detail/member-card-detail.component';
import { MemberDetailResolver } from './resolvers/member-detailed-resolver';
import { MemberListResolver } from './resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

@NgModule({
  declarations: [							
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberlistsComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberCardDetailComponent,
      MemberEditComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(Approutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {return localStorage.getItem('token')},
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: ["localhost:5000/api/auth/"],
      },
    }),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    AuthService,
    UserService,
    AlertifyService,
    MemberDetailResolver,
    MemberListResolver,
    { provide: HTTP_INTERCEPTORS, useClass: exceptioninterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
