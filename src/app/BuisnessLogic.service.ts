import { Injectable } from '@angular/core';

@Injectable()
export class BuisnessLogicService {

/// UserName
    private _Token : String;
    public get Token() : String {
        return this._Token;
    }
    public set Token(v : String) {        
        this._Token = v;
    }
    
///

constructor() { 
}

}