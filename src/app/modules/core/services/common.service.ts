import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getQualification(){
    return this.http.get<any>(environment.apiUrl +'/HighestQualification/GetAllQualification');
  }
}
