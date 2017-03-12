import { Component } from '@angular/core';
import {BuisnessLogicService} from './BuisnessLogic.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private service:BuisnessLogicService;
  /**
   *
   */
  constructor( BLService : BuisnessLogicService ) {
    this.service = BLService;
  }
  title = 'app works!';
}
