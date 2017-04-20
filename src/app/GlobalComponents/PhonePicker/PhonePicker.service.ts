import { Injectable } from '@angular/core';
import {PhoneNumber,PhoneNumberStatus,PhoneNumberType} from '../../Entities';
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../../BuisnessLogic.service'

@Injectable()
export class PhonePickerService {

    constructor(private http:Http, private BLService : BuisnessLogicService){
    }

    public GetPhones(isVDID : boolean) : Promise<PhoneNumber[]>{
        console.log("GetPhones Called");
        
        var url = "http://localhost:8080/getFreePhones"
        var requestBody = {
            "token" : this.BLService.Token,
            "isVDID" : isVDID
        }

        return new Promise((resolve,reject)=>{
            if(!this.BLService.LoggedIn){
                reject({error:"not logged in"});
            }
            this.http.post(url,requestBody).toPromise().then(
            (success)=>{
                console.log("GetPhones success");                                    
                resolve(JSON.parse(success.text()))
            },
            (fail)=>{
                console.log("GetPhones fail");
                reject(JSON.parse(fail.text()))
            })
        })
    }

}