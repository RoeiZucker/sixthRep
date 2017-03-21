export enum Role 
{
     GlobalManager = 0,
     CompanyManager = 1,
     BrancManager = 2,
     Salesman = 3
}

export enum Status
{
    Active = 0,
    Suspended = 1,
    Discontinued = 2
}

export enum Language
{
    English = 0,
    Hebrew = 1,
    Russian = 2,
    Arabic = 3
}

export class User 
{
    public CompanyId:string;
    public Role : Role;
    FirstName : string;
    _id : string;
    LastName : string;
    ContactPhoneNumber : string;
    EmailAddress:string;
    Address:string;
    City:string;
    Country:string;
    Zip:string;
    MobileNumber:string;
    Status : Status;
    Username : string;
    LifetimeRevenue : number;
    Language : Language;
    Notes : string;
    BranchId : string;
}

export class Company 
{
    _id: string;
    Name : string;
    ContactName : string;
}

export class Transaction
{
    _id : string;
    TimeStamp : string;
    CompanyId: string;
    CreatorId : string;
}