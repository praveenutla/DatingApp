import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = environment.apiUrl + 'auth/';
  jwt = new JwtHelperService();
  decodeToken:any;
  currentuser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  constructor(private http: HttpClient) { }

  login(model: any){
    var resp  = this.http.post(this.baseurl+'login',model);
      return resp.pipe(
        map((response:any) =>{
          const user = response;
          if(user){
            localStorage.setItem('token',user.token);
            localStorage.setItem('user',JSON.stringify(user.userReturn));
            this.decodeToken = this.jwt.decodeToken(user.token);
            this.currentuser = user.userReturn;
            this.changeMemberPhoto(this.currentuser.photoUrl);
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
