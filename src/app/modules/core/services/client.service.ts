import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../../master/models/client';
import { ResponseObj } from '../../master/models/college';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllClientList(){
    const pageStart = 1
    const pageSize = 10000
    return this.http.get<any>(environment.apiUrl+'/Client/GetAllClient?'+'pageStart='+pageStart+'&pageSize='+pageSize)
  }

  getClientList(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Client/GetAllClient?'+'pageStart='+pageStart+'&pageSize='+pageSize)
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]> {
    // Make API request with search term as query parameter
    return this.http.get<any>(environment.apiUrl+'/Client/GetAllClient?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  addClient(data:Client){
    return this.http.post<ResponseObj>(environment.apiUrl+'/Client/AddClient',data)
  }

  deleteClient(id:number){
    return this.http.delete<any>(environment.apiUrl+'/Client/DeleteClient?Id='+id)
  }

  getDetailById(id:number){
    return this.http.get<any>(environment.apiUrl+'/Client/GetClientById?clientId='+id)
  }

  updateDetails(data:any){
    return this.http.post<ResponseObj>(environment.apiUrl+'/Client/EditClient',data)
  }

  activeInactive(id:any){
    return this.http.get<any>(environment.apiUrl+'/Client/ClientActiveInactive?id='+id)
  }
}
