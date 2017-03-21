import { Component, OnInit } from '@angular/core';
import {BuisnessLogicService} from '../../BuisnessLogic.service'

@Component({
  selector: 'app-TransactionsPage',
  templateUrl: './TransactionsPage.component.html',
  styleUrls: ['./TransactionsPage.component.css']
})
export class TransactionsPageComponent implements OnInit {

  constructor(private BLService : BuisnessLogicService){


  }
  ngOnInit() {
    
  }



}