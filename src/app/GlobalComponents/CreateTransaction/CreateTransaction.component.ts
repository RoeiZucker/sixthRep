import { Component, OnInit } from '@angular/core';
import { CreateTransactionService } from './CreateTransaction.service'
import {Transaction, SimCard, PhoneNumber} from './../../Entities'
import {BuisnessLogicService} from './../../BuisnessLogic.service'

@Component({
  selector: 'app-CreateTransaction',
  templateUrl: './CreateTransaction.component.html',
  styleUrls: ['./CreateTransaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  /// Members
    private m_CreateTransactionsService : CreateTransactionService;
  ///

  /// Properties
    public Transaction : Transaction = new Transaction();
    public BuisnessLogicService : BuisnessLogicService;
    public StartDate : string;
    public EndDate : string;
  ///
  

  constructor( crtTransSrv : CreateTransactionService, BLService : BuisnessLogicService) {
    this.m_CreateTransactionsService = crtTransSrv;
    this.BuisnessLogicService = BLService;
  }

  ngOnInit() {
    this.Transaction.CompanyId = this.BuisnessLogicService.UserData.CompanyId;
    this.Transaction.CreatorId = this.BuisnessLogicService.UserData._id;
  }

  handleSimSelected(selectedSim : SimCard) : void{
    console.log(selectedSim._id);
    
    this.Transaction.SimCardId = selectedSim._id;
    
  }

  handlePhoneSelected(selectedPhone : PhoneNumber) : void{   
    console.log(selectedPhone._id);
    
    this.Transaction.PhoneNumberId = selectedPhone._id;
    
  }
  CreateTransaction(event): void {
    this.Transaction.TimeStamp = Date.now();
    this.Transaction.StartDate = (new Date(this.StartDate)).getTime();
    this.Transaction.EndDate = (new Date(this.EndDate)).getTime();
    var obj : any;
    obj = this.Transaction;
    obj.SimCard = this.Transaction.SimCardId;
    obj.PhoneNumber = this.Transaction.PhoneNumberId;
    this.m_CreateTransactionsService.CreateNewTransaction(obj).then(
      (success)=>{
        console.log(success);
      },
      (reject)=>{
        console.log(reject);
      })
  }
}