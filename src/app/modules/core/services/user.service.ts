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
  
  getAllUser(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/User/GetAllUser?'+'pageStart='+pageStart+'&pageSize='+pageSize)
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/User/GetAllUser?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  addUser(data:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'/User/AddUser',data)
  }

  getCurrentData(id:any){
    return this.http.get<any>(environment.apiUrl+'/User/GetUserById?UserId='+id)
  }

  updateUser(data:any){
    return this.http.post<any>(environment.apiUrl+'/User/EditUser',data)
  }

  // editUser(data:any):Observable<any>{
  //   return this.http.post<any>(environment.apiUrl+'/EditUser?clientid=')
  // }

  deleteUser(id:any){
    return this.http.delete<any>(environment.apiUrl+'/User/DeleteUserById?UserId='+id)
  }

  getUserById(id:any){
    return this.http.get<any>(environment.apiUrl+'/User/GetUserById?UserId='+id)
  }

  toggleActiveAndInactive(id:any){
    return this.http.get<any>(environment.apiUrl+'/User/UserActiveInactive?UserId='+id)
  }
}
