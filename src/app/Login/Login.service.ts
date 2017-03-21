import { Injectable,OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {BuisnessLogicService} from '../BuisnessLogic.service'
import {User} from '../Entities'
import 'rxjs/Rx';

@Injectable()
export class LoginService implements OnInit{
public Login(username : string, password : string) : Promise<any>
{
    console.log("Login was called");    
    var url = "http://localhost:8080/login";
    return new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
        this.http.post(url,{'username':username,'password':password}).toPromise().then(
        (sucess)=>
        {
            let userData = JSON.parse(sucess.text());
            this.implementUser(userData);
            console.log(sessionStorage.getItem("token"));
            resolve(userData);
        },
        (error) => 
        {
            reject(JSON.parse(error.text()));
        }
    )
    });
}

public TokenLogin(token : string) : Promise<User>
{
    console.log("Login was called");    
    var url = "http://localhost:8080/tokenLogin";
    return new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
        this.http.post(url,{'token':token}).toPromise().then(
        (sucess)=>
        {            
            console.log("TokenLogin Success");
            
            let userData = JSON.parse(sucess.text());    
            this.implementUser(userData);
            resolve(JSON.parse(sucess.text()));
        },
        (error) => 
        {
            reject(JSON.parse(error.text()));
        }
    )
    });
}

private implementUser(userData) : void {
    console.log("implamantUser function called");
    this.BLService.Token = userData.token;
    this.BLService.UserData = userData.User
    this.BLService.LoggedIn = true;
    sessionStorage.setItem("token",this.BLService.Token);
    console.log(userData);
    
}

constructor(private http:Http, private BLService : BuisnessLogicService){
    let currToken = sessionStorage.getItem("token");
    if (currToken)
    {
        this.TokenLogin(currToken).then
        (
            (resolve)=>{},
            (reject) =>{sessionStorage.removeItem('token')}
        )
    }
}

  ngOnInit() {
  }


}