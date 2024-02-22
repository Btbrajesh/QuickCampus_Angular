import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../modals/login';

@Injectable({
    providedIn: 'root'
  })
  
export class AccountService {

    constructor(private http: HttpClient) {
    }

    login(loginData: Login): Observable<any> {
        return this.http.post(`${environment.apiUrl}/Account/AdminLogin`, loginData);
    }


}