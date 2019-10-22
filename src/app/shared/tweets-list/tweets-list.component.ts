import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweet } from '../../core/models';
import { TweetsService } from '../../core/services/index';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() userName: string = '';  //user name input
  @Input() updateTweets: boolean;  //refresh tweet list
  intervalId;
  tweetList: Observable<ITweet[]>; //list of tweets
  constructor(private tweetsService: TweetsService) { }

  ngOnInit() {
    if (this.userName === '') {//get all tweets
      this.getTweets()
    }
    else {
      this.getTweetsByUserName();//get tweets by user name
    }
    this.updatedTweetsList(); //update tweet list
  }

  ngOnDestroy() {
    this.userName === '';
    clearInterval(this.intervalId);
  }

  ngOnChanges() {//if request to update tweets was emitted update tweets
    if (this.updateTweets) {
      this.tweetList = this.tweetsService.getAllTweets();
      this.updateTweets = false;
    }
  }

  //get updated tweet list every 10 seconds
  updatedTweetsList() {
    if (this.userName === '')
      this.intervalId = setInterval(() => {
        this.getTweets()
      }, 10000);
    else {
      this.intervalId = setInterval(() => { this.getTweetsByUserName() }, 10000);
    }
  }

  //get all tweeets
  getTweets() {
    this.tweetList = this.tweetsService.getAllTweets();
  }

  //get tweets by userName
  getTweetsByUserName() {
    this.tweetList = this.tweetsService.getTweetsByUserName(this.userName);
  }
}
