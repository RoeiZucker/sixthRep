import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {BuisnessLogicService} from '../../BuisnessLogic.service';
import {SimPickerService} from './SimPicker.service'
import {SimCard, SimStatus, SimType} from '../../Entities'

@Component({
  selector: 'app-SimPicker',
  templateUrl: './SimPicker.component.html',
  styleUrls: ['./SimPicker.component.css']
})
export class SimPickerComponent implements OnInit {

  /// Members
     public SimCards : SimCard[] = [];
     
     private _SimCard : SimCard;
     public get SimCard() : SimCard {
       return this._SimCard;
     }
     public set SimCard(v : SimCard) {

       this._SimCard = v;
        if (this._SimCard) {          
          this.SimSelected.emit(this._SimCard);
        }
     }
  ///

  constructor(private BLService : BuisnessLogicService, private SimService : SimPickerService){
  }

  @Output() SimSelected = new EventEmitter();

  ngOnInit() {
    this.SimService.GetSims().then(
      (resolved)=>{
        this.SimCards = resolved;
      },
      (rejected)=>{
        console.log(rejected);
      }
    )
  }
}