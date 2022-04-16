import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode=false;
  sendvalue: string = 'praveen kumar';

  constructor() { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelFromReg(emitvalue: boolean ){
    this.registerMode = emitvalue;
  }


}
