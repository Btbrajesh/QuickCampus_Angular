export interface College{
    ImagePath:string,
    collegeName:string,
    collegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    ContectPerson:string,
    ContectEmail:string,
    ContectPhone:number,
    Address1:string,
    isActive:boolean,
}

export interface ResponseObj{
    data :College;
    message : string;
    status: number;
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