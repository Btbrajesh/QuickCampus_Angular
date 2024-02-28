import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../../master/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getClientList():Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Client/GetAllClient')
  }

  addClient(data:Client){
    return this.http.post<any>(environment.apiUrl+'/Client/AddClient',data)
  }

  deleteClient(id:number){
    return this.http.delete<any>(environment.apiUrl+'/Client/DeleteClient?Id='+id)
  }

  getDetailById(id:number){
    return this.http.get<any>(environment.apiUrl+'/Client/DetailsClient?Id='+id)
  }

  updateDetails(data:any){
    return this.http.post<any>(environment.apiUrl+'/Client/EditClient',data)
  }
}
