import { Component, OnInit } from '@angular/core';
import {TransactionsService} from './Transactions.service'
import {BuisnessLogicService} from '../BuisnessLogic.service'
import {Transaction} from '../Entities'

@Component({
  selector: 'app-Transactions',
  templateUrl: './Transactions.component.html',
  styleUrls: ['./Transactions.component.css']
})
export class TransactionsComponent implements OnInit {

    Transactions : Transaction[];
  constructor(private BLService : BuisnessLogicService, private TransService : TransactionsService){
    console.log("transactions created");
    
  }
  ngOnInit() {
    this.TransService.GetAllTransactions().then(
      (resolve)=>{
        this.Transactions = resolve;
        console.log("transactions component init");
      },
      (reject)=>{
        console.log(reject);
      })
  }
  GetDateString(timeNumber : number) : string
  {
    return new Date(timeNumber).toString();
  }

}