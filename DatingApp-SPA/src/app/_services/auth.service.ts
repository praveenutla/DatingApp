import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(model: any){
    var resp  = this.http.post(this.baseurl+'login',model);
      return resp.pipe(
        map((response:any) =>{
          const user = response;
          if(user){
            localStorage.setItem('token',user.token);
          }
        })
      );
  }
}
