export interface College{
    ImagePath:string,
    CollegeName:string,
    CollegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    contectperson:string,
    contectemail:string,
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
    CollegeName:string,
    CollegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    contectperson:string,
    contectemail:string,
    ContectPhone:string,
    Address1:string,
    Address2:string,
    
}