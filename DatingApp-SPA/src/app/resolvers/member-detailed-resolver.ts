import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, observable, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable({ providedIn: 'root' })
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService, private alertifyService:AlertifyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
        catchError(error => {
            this.alertifyService.error('error in getting user data. Details: ' + error);
            this.router.navigate(['/memberlists']);
            return new Observable<User>();
          })
    );
  }
}