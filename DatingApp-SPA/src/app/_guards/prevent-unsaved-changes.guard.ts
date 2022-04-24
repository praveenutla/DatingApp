import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

  constructor() {
        
  }

  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty){
      return confirm('Are you sure you want to continue ? Any changes will be lost.');
    }
    return true;
  }

}
