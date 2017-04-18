import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import {PhonePickerService} from './PhonePicker.service'
import {PhoneNumber,PhoneNumberStatus,PhoneNumberType} from '../../Entities'
import {BuisnessLogicService} from '../../BuisnessLogic.service'

@Component({
  selector: 'app-PhonePicker',
  templateUrl: './PhonePicker.component.html',
  styleUrls: ['./PhonePicker.component.css']
})
export class PhonePickerComponent implements OnInit {


  /// Members
    public PhoneNumbers : PhoneNumber[] = [];

    
    private _PhoneNumber : PhoneNumber;
    public get PhoneNumber() : PhoneNumber {

      return this._PhoneNumber;
    }
    public set PhoneNumber(v : PhoneNumber) {

      this._PhoneNumber = v;
      if (this._PhoneNumber) {        
        this.PhoneSelected.emit(this._PhoneNumber);        
      }
    }
    
  ///

  /// Inputs
    @Input() IsVDID : boolean;
    @Input() SourcePhoneNumber : PhoneNumber;
  ///

  /// Events
    @Output() PhoneSelected = new EventEmitter<PhoneNumber>();
  ///

  constructor(private BLService: BuisnessLogicService, private PhoneService : PhonePickerService) { }

  ngOnInit() {
      this.PhoneService.GetPhones(this.IsVDID).then(
        (resolved)=>{
          this.PhoneNumbers = resolved;
        },
        (rejected)=>{
          console.log(rejected);
        }
    )
  }

}