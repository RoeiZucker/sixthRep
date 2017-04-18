import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plan } from '../../Entities';
import {BuisnessLogicService} from '../../BuisnessLogic.service'
import {PlanPickerService} from './PlanPicker.service'

@Component({
  selector: 'app-PlanPicker',
  templateUrl: './PlanPicker.component.html',
  styleUrls: ['./PlanPicker.component.css']
})
export class PlanPickerComponent implements OnInit {

  @Output() PlanSelected = new EventEmitter<Plan>();

  public Plans : Plan[];

  
  private _SelectedPlan : Plan;
  public get SelectedPlan() : Plan {
    return this._SelectedPlan;
  }
  public set SelectedPlan(v : Plan) {
    this._SelectedPlan = v;
    if (this._SelectedPlan) {
      this.PlanSelected.emit(this._SelectedPlan);
    }
  }
  

  constructor(private BLService: BuisnessLogicService, private PlanService : PlanPickerService) { }

  ngOnInit() {
    this.PlanService.GetPlans().then(
      (resolved)=>{        
        this.Plans = resolved
      },
      (reject)=>{
        console.log(reject);
      }
    )
  }

}