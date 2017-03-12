import { Component, OnInit } from '@angular/core';
import {BuisnessLogicService} from '../BuisnessLogic.service'

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  private service:BuisnessLogicService;
  constructor(BLService : BuisnessLogicService) {
    this.service = BLService;
   }
  ngOnInit() {
  }

}
