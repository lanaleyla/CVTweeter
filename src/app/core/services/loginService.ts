import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from '../models';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    _userName = new BehaviorSubject<string>('');
    userName: Observable<string> = this._userName.asObservable();
    _username: string = '';

    constructor(private http: HttpClient) {
    }

    get username(): string {
        return this._username;
    }

    set username(userName: string) {
        this._username = userName;
        this._userName.next(this._username);
    }

    get userUserNameObservable(): Observable<string> {
        return this.userName;
    }

    login(email, password) {
        return this.http.post('http://localhost:3001/api/auth/login', { email: email, password: password })
            .pipe(
                map(data => {
                    localStorage.setItem('token', data['token'].toString());
                    localStorage.setItem('userName', data['u'].userName);
                    this.username = localStorage.getItem('userName');
                    localStorage.setItem('userId', data['u'].id);//fix this 
                    return data.toString();
                }))
            .toPromise();
    }

    register(email, password, userName) {
        return this.http.post('http://localhost:3001/api/auth/register', { email: email, password: password, userName: userName })
            .toPromise()
    }
}