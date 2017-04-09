import { Injectable } from '@angular/core';
import {SimCard,SimStatus,SimType} from '../../Entities'
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../../BuisnessLogic.service'

@Injectable()
export class SimPickerService {

    constructor(private http:Http, private BLService : BuisnessLogicService){
    }

    public GetSims() : Promise<SimCard[]>
    {
        console.log("GetSims Called");
        
        var url = "http://localhost:8080/getFreeSims"
        var requestBody = {"token" : this.BLService.Token}        
        return new Promise((resolve,reject)=>{
            if(!this.BLService.LoggedIn){
                reject({error:"not logged in"});
            }

            this.http.post(url,requestBody).toPromise().then(
            (success)=>{
                console.log("GetSims success");                    
                resolve(JSON.parse(success.text()))
            },
            (fail)=>{
                console.log("GetSims fail");
                reject(JSON.parse(fail.text()))
            })
        })
    }


}