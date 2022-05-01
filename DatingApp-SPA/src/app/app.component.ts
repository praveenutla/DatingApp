import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  jwt = new JwtHelperService();
  constructor(private auth:AuthService) {
    
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user')??'');
    this.auth.currentuser = user;
    this.auth.decodeToken = this.jwt.decodeToken(token??'');
    this.auth.changeMemberPhoto(user.photoUrl);
  }
  title = 'DatingApp-SPA';
}
