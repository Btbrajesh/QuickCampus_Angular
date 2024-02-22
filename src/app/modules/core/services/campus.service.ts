import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private http:HttpClient) { }

  getCampusList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/ManageCampus');
  }

  getCampusById(campusId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Campus/getCampusByCampusId?campusId'+campusId);
  }
}
