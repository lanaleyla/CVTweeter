import { Component, OnInit, Input } from '@angular/core';
import { ITweet } from 'src/app/core/models';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: ITweet;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private http: HttpClient) {
    iconRegistry.addSvgIcon(
      'grade-24px',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/grade-24px.svg'));
  }

  ngOnInit() {
  }

  sendRequest() {
    // this.http.post('http://localhost:3001/api/tweets',{content:'i love anastasia'})//this works
    // this.http.post('http://localhost:3001/api/tweets/5da2048f067af55dc849c884/star-toggle',{})//this works
    this.http.post('http://localhost:3001/api/auth/register', { email: 'sasha@gmail.com', password: '123', userName: 'sasha' })
      .pipe(
        map(data => {
          console.log(data);
        })
      )
      .toPromise()
      .catch((err) => console.log(err))
  }
}


//    this.http.get('http://localhost:3001/api/members')//this works
