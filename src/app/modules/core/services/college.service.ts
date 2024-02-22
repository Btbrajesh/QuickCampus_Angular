import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http:HttpClient) { }

  getCollegeList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetAllCollege');
  }

  getCollegeById(collegeId:number): Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/College/GetCollegeDetailsById?Id='+collegeId);
  }

 
}
