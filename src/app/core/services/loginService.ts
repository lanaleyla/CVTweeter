import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    _userName = new BehaviorSubject<string>('');
    userName: Observable<string> = this._userName.asObservable();
    _username: string = ''; //the user name of looged in user

    constructor(private http: HttpClient) {
        this.username = localStorage.getItem('userName');
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

    //login to the system
    login(email, password) {
        return this.http.post('http://localhost:3001/api/auth/login', { email: email, password: password })
            .pipe(
                map(data => {
                    this.setLocalStorage(data['token'].toString(),data['u'].userName);
                    this.username = localStorage.getItem('userName');
                    return data.toString();
                }))
            .toPromise();
    }

    //register to the system
    register(email, password, userName, userImage) {
        return this.http.post('http://localhost:3001/api/auth/register', { email: email, password: password, userName: userName, userImage: userImage })
            .toPromise();
    }

    //insert user name and token to local storage
    setLocalStorage(token: string, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', username);
    }
}