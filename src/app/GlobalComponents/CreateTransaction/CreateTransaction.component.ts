import { Component, OnInit } from '@angular/core';
import { CreateTransactionService } from './CreateTransaction.service'
import {Transaction, SimCard, PhoneNumber, Plan} from './../../Entities'
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
    public SelectedSim : SimCard;
    public SelectedPhoneNumber : PhoneNumber;
    public SelectedVDID : PhoneNumber;
    public SelectedPlan : Plan;
    public BuisnessLogicService : BuisnessLogicService;
    public StartDate : string;
    public EndDate : string;
  ///
  
  /// C'tor
    constructor( crtTransSrv : CreateTransactionService, BLService : BuisnessLogicService) {
      this.m_CreateTransactionsService = crtTransSrv;
      this.BuisnessLogicService = BLService;
    }

    ngOnInit() {
      this.Transaction.CompanyId = this.BuisnessLogicService.UserData.CompanyId;
      this.Transaction.CreatorId = this.BuisnessLogicService.UserData._id;
    }
  ///

  /// Methods
    handleSimSelected(selectedSim : SimCard) : void{
      console.log(selectedSim._id);
      this.SelectedSim = selectedSim;
      this.Transaction.SimCardId = selectedSim._id;      
      if (selectedSim.PhoneNumber) {
        this.SelectedPhoneNumber = selectedSim.PhoneNumber;
        this.Transaction.PhoneNumberId = this.SelectedPhoneNumber._id;
      }
    }

    handlePhoneSelected(selectedPhone : PhoneNumber) : void{   
      console.log("CreateTransactionComponent.handlePhoneSelected: " + selectedPhone._id);
      this.SelectedPhoneNumber = selectedPhone;
      this.Transaction.PhoneNumberId = selectedPhone._id;
    }

    handleVDIDSelected(selectedPhone : PhoneNumber) : void{   
      console.log(selectedPhone._id);
      this.SelectedVDID = selectedPhone;
    }

    handlePlanSelected(selectedPlan : Plan) : void{
      console.log({"CreateTransaction.component.handlePlanSelected":selectedPlan});
      this.SelectedPlan = selectedPlan;
      this.Transaction.PlanId = selectedPlan._id;
       
    }

    CreateTransaction(event): void {
      this.Transaction.TimeStamp = Date.now();
      this.Transaction.StartDate = (new Date(this.StartDate)).getTime();
      this.Transaction.EndDate = (new Date(this.EndDate)).getTime();
      var obj : any;
      obj = this.Transaction;
      obj.SimCard = this.Transaction.SimCardId;
      obj.PhoneNumber = this.Transaction.PhoneNumberId;
      if(this.SelectedVDID){
        obj.AttachedPhoneNumber = this.SelectedVDID._id;
        obj.AttachedPhoneNumberId = this.SelectedVDID._id;
      }
      obj.Creator = this.BuisnessLogicService.UserData._id;
      obj.Company = this.BuisnessLogicService.Company._id;
      obj.Plan = this.SelectedPlan._id;
      this.m_CreateTransactionsService.CreateNewTransaction(obj).then(
        (success)=>{
          console.log(success);
        },
        (reject)=>{
          console.log(reject);
        })
      
    }
  ///
}