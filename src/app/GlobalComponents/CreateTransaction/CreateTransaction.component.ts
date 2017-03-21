import { Component, OnInit } from '@angular/core';
import { CreateTransactionService } from './CreateTransaction.service'

@Component({
  selector: 'app-CreateTransaction',
  templateUrl: './CreateTransaction.component.html',
  styleUrls: ['./CreateTransaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  /// Members
    createTransactionsService : CreateTransactionService;
  ///


   

  constructor( crtTransSrv : CreateTransactionService) {
    this.createTransactionsService = crtTransSrv;
  }

  ngOnInit() {
  }

  CreateTransaction(event): void {
    console.log(event);

  }
}