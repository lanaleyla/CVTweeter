import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../core/services/loginService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: string;
  sub: Subscription;
  updateTweet: boolean;
  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.sub = this.loginService.userUserNameObservable.subscribe(
      (data) => { this.user = data });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //update tweets event detected
  updateTweets(event) {
    this.updateTweet = event;
  }


}
