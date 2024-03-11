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

  getAllRole():Observable<any>{
    return this.http.get<Response>(environment.apiUrl+'/Role/RoleList')
  }

  getAllPermission():Observable<any>{
    return this.http.get<any>(environment.apiUrl + '/Account/getallpermission')
  }

  addRole(data:any){
    return this.http.post<ResponseObj>(environment.apiUrl + '/Role/AddRole',data)
  }

  getRoleById(id:any){
    return this.http.get<any>(environment.apiUrl + '/Role/GetRoleById?rId='+id)
  }

  updateRole(data:any){
    return this.http.post<any>(environment.apiUrl+'/Role/EditRole',data)
  }

  deleteRole(id:any){
    return this.http.delete<ResponseObj>(environment.apiUrl+'/Role/DeleteRole?id='+id)
  }
}
