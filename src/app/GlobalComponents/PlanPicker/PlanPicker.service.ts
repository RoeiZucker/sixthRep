import { Injectable } from '@angular/core';
import {Plan} from '../../Entities';
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../../BuisnessLogic.service'

@Injectable()
export class PlanPickerService {

    constructor(private http:Http, private BLService : BuisnessLogicService){
    }
     
    public GetPlans() : Promise<Plan[]>
    {
        console.log("GetPlans Called");
        var url = "http://cryptic-garden-53945.herokuapp.com/GetPlans"
        var requestBody = {"token" : this.BLService.Token}        
        return new Promise((resolve,reject)=>{
            if(!this.BLService.LoggedIn){
                reject({error:"not logged in"});
            }
            this.http.post(url,requestBody).toPromise().then(
            (success)=>{
                console.log("GetPlans success");                                    
                resolve(JSON.parse(success.text()))
            },
            (fail)=>{
                console.log("GetPlans fail");
                reject(JSON.parse(fail.text()))
            })
        })
    }
}