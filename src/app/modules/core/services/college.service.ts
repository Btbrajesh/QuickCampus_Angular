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

  getCollegeList(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetAllCollege?'+'pageStart='+pageStart+'&pageSize='+pageSize);
  }

  getAllCollegeList(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/College/GetAllCollege?'+'pageStart='+pageStart+'&pageSize='+pageSize)
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/College/GetAllCollege?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  getCollegeById(collegeId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetCollegeDetailsByCollegeId?collegeId='+collegeId);
  }

  addCollege(data:College):Observable<any>{
    var formData = new FormData;
    formData.append('ImagePath',data.ImagePath)
    formData.append('CollegeCode',data.CollegeCode)
    formData.append('CollegeName',data.CollegeName)
    formData.append('Address1',data.Address1)
    formData.append('Address2',data.Address2)
    formData.append('StateId',data.StateId)
    formData.append('CountryId',data.CountryId)
    formData.append('CityId',data.CityId.toString())
    formData.append('ContactPerson',data.ContactPerson)
    formData.append('ContactPhone',data.ContactPhone)
    formData.append('ContactEmail',data.ContactEmail)
   
    return this.http.post<any>(environment.apiUrl+'/College/AddCollege',formData)
  }

  updateCollege(data:any): Observable<any>{
    var formData = new FormData;
    formData.append('CollegeId',data.CollegeId)
    formData.append('ImagePath',data.ImagePath)
    formData.append('CollegeCode',data.CollegeCode)
    formData.append('CollegeName',data.CollegeName)
    formData.append('Address1',data.Address1)
    formData.append('Address2',data.Address2)
    formData.append('StateId',data.StateId)
    formData.append('CountryId',data.CountryId)
    formData.append('CityId',data.CityId.toString())
    formData.append('ContactPerson',data.ContactPerson)
    formData.append('ContactPhone',data.ContactPhone)
    formData.append('ContactEmail',data.ContactEmail)
    return this.http.post<any>(environment.apiUrl+'/College/EditCollege',formData)
  }

  deleteByID(id:any): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/College/DeleteCollege?CollegeId='+id)
  }

  toggleActiveInactive(id:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl + '/College/CollegeActiveInactive?CollegeId='+id)
  } 
}
