import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }
  
  getAllUser():Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/User/UserList')
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/User/UserList?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  addUser(data:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'/User/AddUser',data)
  }

  getCurrentData(id:any){
    return this.http.get<any>(environment.apiUrl+'/User/GetUserDetailsById?Id='+id)
  }

  updateUser(data:any){
    return this.http.post<any>(environment.apiUrl+'/User/EditUser',data)
  }

  // editUser(data:any):Observable<any>{
  //   return this.http.post<any>(environment.apiUrl+'/EditUser?clientid=')
  // }

  deleteUser(id:any){
    return this.http.delete<any>(environment.apiUrl+'/User/DeleteUser?id='+id)
  }

  getUserById(id:any){
    return this.http.get<any>(environment.apiUrl+'/User/GetUserDetailsById?Id='+id)
  }

  
}
