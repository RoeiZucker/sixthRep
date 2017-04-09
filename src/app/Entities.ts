export enum Role {
     GlobalManager = 0,
     CompanyManager = 1,
     BrancManager = 2,
     Salesman = 3
}

export enum UserStatus{
    Active = 0,
    Suspended = 1,
    Discontinued = 2
}

export enum SimType{
    Macro = 0,
    Micro = 1,
    Nano = 2
}

export enum SimStatus{
    Available = 0,
    Active = 1,
    Stolen = 2,
    Cancelled = 3,
    Reactivate = 4,
    Lost = 5
}

export enum Language{
    English = 0,
    Hebrew = 1,
    Russian = 2,
    Arabic = 3
}

export enum PhoneNumberStatus{
    Available = 0,
    Active = 1,
    Deleted = 2,
    Suspended = 3,
    Terminated = 4

}

export enum PhoneNumberType{
    DID = 0,
    VDID = 1
}

export class User {
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
    Status : UserStatus;
    Username : string;
    LifetimeRevenue : number;
    Language : Language;
    Notes : string;
    BranchId : string;
}

export class Company {
    _id: string;
    Name : string;
    ContactName : string;
}

export class Transaction{
    _id : string;
    TimeStamp : number;
    CompanyId: string;
    CreatorId : string;
    StartDate : number;
    EndDate : number;
    SimCardId : string;
    SimCard : SimCard;
    PhoneNumberId : string;
    PhoneNumber : PhoneNumber;
}

export class SimCard{
    _id : string;
    Type : SimType;
    Status : SimStatus;
    SimNumber : string;
    CompanyId : string;
    PhoneNumberId : string;
}

export class PhoneNumber{
    _id : string;
    Status : PhoneNumberStatus;
    PhoneNumber : string;
    CompanyId : string;
    AttachedPhoneNumberId : string;
    Type : PhoneNumberType;
}