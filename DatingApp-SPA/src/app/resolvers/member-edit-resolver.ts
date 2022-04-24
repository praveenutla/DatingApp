import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, observable, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable({ providedIn: 'root' })
export class MemberEditResolver implements Resolve<User> {

  constructor(private userService: UserService, private alertifyService:AlertifyService, private router: Router,
    private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodeToken.nameid).pipe(
        catchError(error => {
            this.alertifyService.error('error in getting user profile data. Details: ' + error);
            this.router.navigate(['/members']);
            return new Observable<User>();
          })
    );
  }
}