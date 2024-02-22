import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseObj } from '../../master/models/college';
import { Campus } from '../../master/models/campus';

@Injectable({
  providedIn: 'root'
})
export class AddCampusService {

  constructor(public http:HttpClient) { }

  addCampus(data:Campus):Observable<ResponseObj>{
    return this.http.post<any>(environment.apiUrl+'/Campus/AddCampus',data)
  }
}
