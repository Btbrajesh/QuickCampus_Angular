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

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/College/GetAllCollege?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  getCollegeById(collegeId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetCollegeDetailsById?collegeid='+collegeId);
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
    formData.append('CityId',data.CityId)
    formData.append('contectperson',data.contectperson)
    formData.append('ContectPhone',data.ContectPhone)
    formData.append('contectemail',data.contectemail)
   
    return this.http.post<any>(environment.apiUrl+'/College/AddCollege',formData)
  }

  updateCollege(data:any): Observable<any>{
    return this.http.post<any>(environment.apiUrl+'/College/EditCollege',data)
  }

  deleteByID(id:any): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/College/DeleteCollege?id='+id)
  }
 
}
