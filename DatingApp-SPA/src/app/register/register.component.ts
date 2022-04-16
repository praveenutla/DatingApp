import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.model.username = this.valuefromhome;
  }

  register(){
    console.log(this.model);
  }

  cancel(){
    this.sendtohome.emit(false);
    console.log("cancelled");
  }

}
