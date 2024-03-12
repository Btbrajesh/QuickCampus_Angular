import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { College, ResponseObj } from '../../master/models/college';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http:HttpClient) { }

  getCollegeList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetAllCollege');
  }

  getCollegeById(collegeId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetCollegeDetailsById?collegeid='+collegeId);
  }

  addCollege(data:College):Observable<ResponseObj>{
    var formData = new FormData;
    formData.append('ImagePath',data.ImagePath)
    formData.append('CollegeName',data.collegeName)
    formData.append('CollegeCode',data.collegeCode)
    formData.append('CityId',data.CityId)
    formData.append('ContectPhone',String(data.ContectPhone))
    formData.append('StateId',data.StateId)
    formData.append('CountryId',data.CountryId)
    formData.append('ContectEmail',data.ContectEmail)
    formData.append('ContectPerson',data.ContectPerson)
    formData.append('Address1',data.Address1)
    formData.append('IsActive',String(true))
    return this.http.post<any>(environment.apiUrl+'/College/AddCollege',formData)
  }

  updateCollege(data:any): Observable<any>{
    return this.http.post<any>(environment.apiUrl+'/College/EditCollege',data)
  }

  deleteByID(id:any): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/College/DeleteCollege?id='+id)
  }
 
}
