import { Component, OnInit ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {BuisnessLogicService} from '../BuisnessLogic.service'
import {LoginService} from './Login.service'
declare var $:any;

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  private AppService:BuisnessLogicService;
  private LoginService : LoginService
  /// Properties  
    private _UserName : string;
    public get UserName() : string {
      return this._UserName;
    }
    public set UserName(v : string) {      
      this._UserName = v;
    }
    
    
    private _Password : string;
    public get Password() : string {
      return this._Password;
    }
    public set Password(v : string) {
      this._Password = v;
    }
  ///
  


  showLogin() : void
  {
    // console.log("show login called");  
  }

  sendLogin() : void
  {
    console.log("sendLogin was called");
    
    this.LoginService.Login(this.UserName, this.Password).then(
      (success)=>
      {
        $("#myModal").modal("hide");        
      },
      (error)=>
      {
        console.log("sendLogin error:");
        console.log(error);
        // show error to user
      }
    ) 
  }

  constructor(BLService : BuisnessLogicService,login : LoginService ) {
    this.AppService = BLService;
    this.LoginService = login;
   }
  ngOnInit() {
  }

}
