import { Injectable } from '@angular/core';
import { BuisnessLogicService } from '../../BuisnessLogic.service';
import {Http, Response} from '@angular/http';
import {Transaction} from '../../Entities'

@Injectable()
export class CreateTransactionService {
    
    /// Properties
    
        private _IsNew : boolean;
        public get IsNew() : boolean {
            return this._IsNew;
        }
        public set IsNew(v : boolean) {
            this._IsNew = v;
        }
    
    ///

    constructor(private BLService: BuisnessLogicService ,private httpService : Http) 
    {
        this.IsNew = false;
    }

    CreateNewTransaction(transaction : Transaction) : Promise<any>
    {
        console.log("CreateNewTransaction was called");
        var url = "http://localhost:8080/Transaction"
        return new Promise((resolve,reject)=>{
            if(!this.BLService.LoggedIn)
            {
                reject({"error":"not logged in"});
            }
            this.httpService.put(url,{
                transaction : transaction,
                token:this.BLService.Token
            }).toPromise().then((success)=>{
                resolve({"success":true})
            },
            (fail)=>{
                reject({"error":fail})
            })
        })
    }
}