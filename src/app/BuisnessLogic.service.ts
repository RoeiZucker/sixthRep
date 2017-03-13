import { Injectable } from '@angular/core';
import {Language,Role,Status,User} from './Entities'
@Injectable()
export class BuisnessLogicService {

/// Properties
    private _Token : String;
    public get Token() : String {
        return this._Token;
    }
    public set Token(v : String) {        
        this._Token = v;
    }
    
    
    private _UserData : User;
    public get UserData() : User {
        return this._UserData;
    }
    public set UserData(v : User) {
        this._UserData = v;
    }


    
    private _LoggedIn : boolean;
    public get LoggedIn() : boolean {
        return this._LoggedIn;
    }
    public set LoggedIn(v : boolean) {
        this._LoggedIn = v;
    }
    
     
///

constructor() { 
    this.LoggedIn = false;
}

}