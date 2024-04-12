import { Time } from "@angular/common"

export interface Campus{
    address1:string;
    address2:string;
    title:string;
    campusDate: Date;
    city:number;
    stateID:number;
    countryID:number;
    isActive:number;
    jobDescription:string;
    walkInID:number,
    selectedCollegeId:number | undefined,
    colleges:Array<AddCollege>;
}

export interface AddCollege{
    campusId:number;
    collegeId:number;
    collegeName:string;
    collegeCode:string;
    examStartTime:Time;
    examEndTime:Time;
    startDateTime:Date;
    isIncludeInWalkIn:boolean
}

export interface UpdateCampus{
    walkInId:number;
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