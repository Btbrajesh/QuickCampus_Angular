import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campus } from '../../master/models/campus';
import { ResponseObj } from '../../master/models/college';
import { Response } from '../../master/models/response';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private http:HttpClient) { }

  getAllCampus():Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Campus/GetAllCampus') 
  }

  getCampusList(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/GetAllCampus?'+'pageStart='+pageStart+'&pageSize='+pageSize);
  }

  searchData(search:string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/Campus/GetAllCampus?search='+search+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  getCampusById(campusId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/getCampusByCampusId?campusId='+campusId);
  }

  addCampus(data:Campus):Observable<ResponseObj>{
    return this.http.post<any>(environment.apiUrl+'/Campus/AddCampus',data)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/Campus/DeleteCampus?campusId='+id)
  }

  updateCampus(data:any){
    return this.http.post<any>(environment.apiUrl +'/Campus/UpdateCampus',data)
  }

  toggleActiveInactive(id:number){
    return this.http.get<any>(environment.apiUrl+'/Campus/CampusActiveInActive?campusId='+id)
  }
}
