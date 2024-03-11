import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Applicant } from '../../master/models/applicant';
import { ResponseObj } from '../../master/models/college';
import { Response } from '../../master/models/response';


@Injectable({
  providedIn: 'root',
})
export class ApplicantService {

  constructor(private http:HttpClient) { }

  getApplicantList(): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Applicant/GetAllApplicant');
  }

  getApplicantById(applicantId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Applicant/GetApplicantById?applicantId='+applicantId);
  }

  updateApplicant(data:Applicant): Observable<any>{
    return this.http.post<ResponseObj>(environment.apiUrl +'/Applicant/EditApplicant',data);
  }

  deleteApplicant(id:number){
    return this.http.delete<any>(environment.apiUrl+'/Applicant/DeleteApplicant?applicantId='+id)
  }

  addApplicant(data:any){
    return this.http.post<ResponseObj>(environment.apiUrl+'/Applicant/AddApplicant',data)
  }

  getStatusList(){
    return this.http.get<Response>(environment.apiUrl+'/Status/GetAllStatus')
  }

  getCompanyList(){
    return this.http.get<Response>(environment.apiUrl+'/Company/GetAllCompany')
  }
  
}