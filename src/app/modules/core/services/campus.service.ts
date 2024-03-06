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

  getCampusList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/ManageCampus');
  }

  getCampusById(campusId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/getCampusByCampusId?campusId='+campusId);
  }

  addCampus(data:Campus):Observable<ResponseObj>{
    return this.http.post<any>(environment.apiUrl+'/Campus/AddCampus',data)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<Response>(environment.apiUrl+'/Campus/DeleteCampus?campusId='+id)
  }
}
