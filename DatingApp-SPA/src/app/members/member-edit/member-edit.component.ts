import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  photoUrl:string;

  constructor(private userService: UserService, private alertifyService: AlertifyService, 
    private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.data.subscribe(data =>{
      this.user = data['user'];
    })

    this.authService.currentPhotoUrl.subscribe(p => this.photoUrl = p);
    // this.userService.getUser(this.authService.decodeToken.nameid).subscribe(
    //   data => {
    //     this.user = data;
    //   }
    // )
  }

  updateUser(){
    this.userService.updateuser(this.user.id, this.user).subscribe(
      next =>{
        this.editForm.reset(this.user);
        this.alertifyService.success('Details saved successfully.');
      },
      error =>{
        this.alertifyService.error('Failed to save details.');
      }
    )
  }

  getMainPhotoUrl(url: string){
    this.user.photoUrl = url;
  }

}
