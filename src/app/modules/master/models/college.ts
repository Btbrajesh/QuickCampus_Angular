export interface College{
    ImagePath:string,
    CollegeName:string,
    CollegeCode:string,
    CityId :number,
    StateId :string,
    CountryId :string,
    ContactPerson:string,
    ContactEmail:string,
    ContactPhone:string,
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
    CollegeId:number,
    ImagePath:string,
    CollegeName:string,
    CollegeCode:string,
    CityId :string,
    StateId :string,
    CountryId :string,
    ContactPerson:string,
    ContactEmail:string,
    ContactPhone:string,
    Address1:string,
    Address2:string,
    
}