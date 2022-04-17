import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuefromhome= '';
  @Output() sendtohome = new EventEmitter<false>();
  
  model:any={};

  constructor(private auth:AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.model.username = this.valuefromhome;
  }

  register(){
    this.auth.register(this.model).subscribe(resp => {
      this.alertify.success('registartion successful');
    }, error => {
      this.alertify.error(error);
    })
  }

  cancel(){
    this.sendtohome.emit(false);
    this.alertify.message("cancelled");
  }

}
