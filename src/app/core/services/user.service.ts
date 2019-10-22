import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './loginService';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getUserByUserName(userName: string): Promise<IUser> {
    return this.http.get<IUser>(`http://localhost:3001/api/members/${userName}`)
      .toPromise()
  }

  // getUserByUserId(userId: string) {
  //   return this.http.get<IUser>(`http://localhost:3001/api/members/${userId}`)
  //     .toPromise()
  //     .then((data) => {
  //       localStorage.setItem('userName', data.userName);
  //     })
  //     .catch((err) => console.log(err)
  //     )
  // }
}
