import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-memberlists',
  templateUrl: './memberlists.component.html',
  styleUrls: ['./memberlists.component.css']
})
export class MemberlistsComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private alertifyService: AlertifyService, 
    private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe(
  //     (resp : User[]) => {
  //       this.users = resp;
  //     },
  //     error => {
  //       this.alertifyService.error(error);
  //     }
  //   )
  // }

}
