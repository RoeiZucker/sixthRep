import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../BuisnessLogic.service'
import 'rxjs/Rx';

@Injectable()
export class LoginService {
public Login(username : string, password : string) : Promise<any>
{
    console.log("Login was called");    
    var url = "http://localhost:8080/login";
    return new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
        this.http.post(url,{'username':username,'password':password}).toPromise().then(
        (sucess)=>
        {            
            resolve(JSON.parse(sucess.text()));
        },
        (error) => 
        {
            reject(JSON.parse(error.text()));
        }
    )
    });


}
constructor(private http:Http, private BLService : BuisnessLogicService) { }

}