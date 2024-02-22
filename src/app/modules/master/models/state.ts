export interface State {
    data:Array<StateInfo>,
    message:string,
    isSuccess:string
}

export interface StateInfo{
    stateId:number,
    stateName:string,
    isActive:boolean,
    isDeleted:boolean
}