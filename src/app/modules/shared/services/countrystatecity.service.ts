import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../master/models/country';
import { environment } from 'src/environments/environment';
import { State } from '../../master/models/state';

@Injectable({
  providedIn: 'root'
})
export class CountrystatecityService {

  constructor(private httpclient:HttpClient) { }

  getCountry(): Observable<Country>{
    return this.httpclient.get<Country>(environment.apiUrl+'/Country/GetAllCountry')
  }

  getStateOfSelectedCountry(countryID: number): Observable<State>{
    return this.httpclient.get<State>(environment.apiUrl+'/State/GetAllState?countryID='+countryID )
  }

  getCitiesOfSelectedState(stateId:number): Observable<any>{
    return this.httpclient.get(environment.apiUrl+'/City/GetAllCity?stateId='+stateId)
  }
}
