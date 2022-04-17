import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = 'http://localhost:5000/api/auth/';
  jwt = new JwtHelperService();
  decodeToken:any;

  constructor(private http: HttpClient) { }

  login(model: any){
    var resp  = this.http.post(this.baseurl+'login',model);
      return resp.pipe(
        map((response:any) =>{
          const user = response;
          if(user){
            localStorage.setItem('token',user.token);
            this.decodeToken = this.jwt.decodeToken(user.token);
          }
        })
      );
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwt.isTokenExpired(token??'');
  }

  register(model:any){
    return this.http.post(this.baseurl+'register',model);
  }
}
