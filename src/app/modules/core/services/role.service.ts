import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseObj } from '../../master/models/college';
import { Response } from '../../master/models/response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }

  getAllRoleList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Role/RoleList')
  }

  getRoleListOnClientId(clientId:number,pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Role/RoleList?ClientId='+clientId+'&pageStart='+pageStart+'&pageSize='+pageSize)
  }

  getAllRole(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<Response>(environment.apiUrl+'/Role/RoleList?'+'pageStart='+pageStart+'&pageSize='+pageSize)
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/Role/RoleList?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  getAllPermission(){
    return this.http.get<any>(environment.apiUrl + '/Account/getallpermission')
  }

  addRole(data:any){
    return this.http.post<ResponseObj>(environment.apiUrl + '/Role/AddRole',data)
  }

  getRoleById(id:any){
    return this.http.get<any>(environment.apiUrl + '/Role/GetRoleById?RoleId='+id)
  }

  updateRole(data:any){
    return this.http.post<any>(environment.apiUrl+'/Role/EditRole',data)
  }

  deleteRole(id:any){
    return this.http.delete<ResponseObj>(environment.apiUrl+'/Role/DeleteRoleByRoleId?RoleId='+id)
  }

  toggleActiveInactive(id:any){
    return this.http.get<any>(environment.apiUrl+'/Role/RoleActiveInactive?RoleId='+id)
  }
}
