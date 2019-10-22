import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITweet } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private http: HttpClient) { }

  //get all tweets
  getAllTweets(): Observable<ITweet[]>{
    return this.http.get<ITweet[]>('http://localhost:3001/api/tweets');
  }

  //get tweets by user name
  getTweetsByUserName(userName: string): Observable<any> {
    return this.http.get(`http://localhost:3001/api/members/${userName}/tweets`)
      .pipe(map(data => {
        return data;
      }))
  }

  //post tweet
  postTweet(content: string): Observable<any> {
    return this.http.post('http://localhost:3001/api/tweets', { content: content })
      .pipe(map(data => {
        return data;
      }))
  }

  //delete a tweet
  deleteTweet(tweetId: string) {
    return this.http.delete(`http://localhost:3001/api/tweets/${tweetId}`)
      .pipe(map(data => { return data })).toPromise();
  }

  //toggle a star
  starATweet(tweetId) {
    return this.http.post(`http://localhost:3001/api/tweets/${tweetId}/star-toggle`, {}).pipe(map(data => { return data }))
      .toPromise();
  }
}
