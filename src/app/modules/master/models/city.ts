export interface City {
    data:Array<CityInfo>,
    message:string,
    isSuccess:string
}

export interface CityInfo{
    cityId:number,
    cityName:string,
    stateId:number,
    isActive:boolean,
    isDeleted:boolean
}