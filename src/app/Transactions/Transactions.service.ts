import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../BuisnessLogic.service'
import {Transaction} from '../Entities'

import 'rxjs/Rx';

@Injectable()
export class TransactionsService {

    constructor(private http:Http, private BLService : BuisnessLogicService){

    }

    public GetAllTransactions() : Promise<Transaction[]>
    {
        console.log("GetAllTransactions was called");
        
        var url = "http://cryptic-garden-53945.herokuapp.com/Transaction?token=" + this.BLService.Token;
        return new Promise((resolve, reject)=>
        {
            if(!this.BLService.LoggedIn)
            {
                reject({error:"not logged in"});
            }
            this.http.get(url).toPromise().then(
                (success)=>{
                    console.log("GetAllTransactions success");                                        
                    resolve(JSON.parse(success.text()))
                },
                (fail)=>{
                    console.log("GetAllTransactions fail");
                    reject(JSON.parse(fail.text()))
                })
        })
    }
}