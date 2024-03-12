export interface College{
    ImagePath:string,
    collegeName:string,
    collegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    ContectPerson:string,
    ContectEmail:string,
    ContectPhone:string,
    Address1:string,
    Address2:string,
}

export interface ResponseObj{
    data :College;
    message : string;
    status: number;
    isSuccess:string;
}

export interface UpdateCollege{
    id:number,
    ImagePath:string,
    collegeName:string,
    collegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    ContectPerson:string,
    ContectEmail:string,
    ContectPhone:string,
    Address1:string,
    Address2:string,
    isActive:boolean,
}