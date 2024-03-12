import { Time } from "@angular/common"

export interface Campus{
    address1:string;
    address2:string;
    title:string;
    campusDate: Date;
    city:number;
    stateId:number;
    countryId:number;
    isActive:number;
    jobDescription:string;
    colleges:Array<AddCollege>;
}

export interface AddCollege{
    campusId:number;
    collegeId:number;
    stateId:number;
    collegeName:string;
    collegeCode:string;
    examStartTime:Time;
    examEndTime:Time;
    startDateTime:Date;
    isIncludeInWalkIn:boolean
}