import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //get user by user name(id)
  getUserByUserName(userName: string): Promise<IUser> {
    return this.http.get<IUser>(`http://localhost:3001/api/members/${userName}`)
      .toPromise()
  }
}
