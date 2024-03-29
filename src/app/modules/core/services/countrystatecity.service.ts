import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../master/models/country';
import { environment } from 'src/environments/environment';
import { State } from '../../master/models/state';
import { Response } from '../../master/models/response';


@Injectable({
  providedIn: 'root'
})
export class CountrystatecityService {

  constructor(private httpclient:HttpClient) { }

  getCountry(): Observable<Country>{
    return this.httpclient.get<Country>(environment.apiUrl+'/Common/GetCountries')
  }

  getStateOfSelectedCountry(countryID: number): Observable<State>{
    return this.httpclient.get<State>(environment.apiUrl+'/Common/GetStatesByCountry?countryId='+countryID )
  }

  getCitiesOfSelectedState(stateId:number): Observable<any>{
    return this.httpclient.get(environment.apiUrl+'/Common/GetAllCity?stateId='+stateId)
  }

  getCityById(cityId:number){
    return this.httpclient.get<Response>(environment.apiUrl+'/City/GetCityById?id='+cityId)
  }

  getStateById(stateId:number){
    return this.httpclient.get<Response>(environment.apiUrl+'/State/GetStateById?stateid='+stateId)
  }

}
