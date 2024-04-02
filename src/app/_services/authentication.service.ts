import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<any | null>;
    public user: Observable<any | null>;
    storedUser:any;
    canActivateProtectedRoutes$: any;
    identityClaims: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.storedUser = JSON.parse(localStorage.getItem('authenticate') || 'null');
        this.userSubject = new BehaviorSubject<any>(this.storedUser || null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any | null {
        return this.userSubject.value;
    }

    login(userName: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Account/Login`, { userName, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (user && user.data) {
                    const userData = user.data;
                    const userName = user.data.userName
                    const userRoleName = user.data.roleMasters.roleName
                    const role = user.data.roleMasters.userAppRoleName
                    const clientId = user.data.cilentId
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authenticate', JSON.stringify(userData));
                    localStorage.setItem('role',role)
                    localStorage.setItem('userName',userName)
                    localStorage.setItem('userRoleName',userRoleName)
                    localStorage.setItem('clientId',clientId)
                    this.userSubject.next(userData);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear()
        // localStorage.removeItem('authenticate');
        // localStorage.removeItem('token');
        // this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}