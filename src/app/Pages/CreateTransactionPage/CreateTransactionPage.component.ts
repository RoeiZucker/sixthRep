import { Component, OnInit } from '@angular/core';
import {BuisnessLogicService} from '../../BuisnessLogic.service'


@Component({
  selector: 'app-CreateTransactionPage',
  templateUrl: './CreateTransactionPage.component.html',
  styleUrls: ['./CreateTransactionPage.component.css']
})
export class CreateTransactionPageComponent implements OnInit {

  constructor(private BLService : BuisnessLogicService) { }

  ngOnInit() {
  }

}