export interface Country {
    data:Array<CountryInfo>,
    message:string,
    isSuccess:string
}

export interface CountryInfo{
    clientId:any,
    countryId:any,
    countryName:string,
    isActive:boolean,
    isDeleted:boolean
}