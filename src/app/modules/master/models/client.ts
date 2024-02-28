export interface Client{
    name:string,
    email:string,
    phone:string,
    address:string,
    subscriptionPlan:string,
    username:string,
    password:string
    confirmPassword:string
}

export interface UpdateClient{
    id:number,
    address:string,
    email:string,
    phone:string,
    subscriptionPlan:string
}