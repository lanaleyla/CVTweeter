import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    _userEmail = new BehaviorSubject<string>('');
    userEmail: Observable<string> = this._userEmail.asObservable();
    _email: string = '';

    get email(): string {
        return this._email;
    }

    set email(userEmail: string) {
        this._email = userEmail;
        this._userEmail.next(this._email);
    }

    get userEmailObservable(): Observable<string> {
        return this.userEmail;
    }
}