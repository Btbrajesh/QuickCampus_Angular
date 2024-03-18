import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { College, ResponseObj } from '../../master/models/college';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddCollegeService {

  constructor(public http:HttpClient) { }

  addCollege(data:College):Observable<ResponseObj>{
    var formData = new FormData;
    formData.append('ImagePath',data.ImagePath)
    formData.append('CollegeName',data.CollegeName)
    formData.append('CollegeCode',data.CollegeCode)
    formData.append('CityId',data.CityId)
    formData.append('ContectPhone',String(data.ContectPhone))
    formData.append('StateId',data.StateId)
    formData.append('CountryId',data.CountryId)
    formData.append('ContectEmail',data.contectemail)
    formData.append('ContectPerson',data.contectperson)
    formData.append('Address1',data.Address1)
    formData.append('IsActive',String(true))
    return this.http.post<any>(environment.apiUrl+'/College/AddCollege',formData)
  }
}
