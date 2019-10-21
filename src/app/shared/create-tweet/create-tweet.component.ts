import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TweetsService } from '../../core/services/index';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  @Output() clickOnPostEvent = new EventEmitter();//alter to update current tweets list
  _tweetContent: string;
  _maxCount: number;
  showMaxLengthErrorMessage: boolean = false;

  constructor(private tweetService: TweetsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.maxCount = 240;
    this.tweetContent = '';
  }

  get tweetContent(): string {
    return this._tweetContent;
  }

  get maxCount(): number {
    return this._maxCount;
  }

  set maxCount(num: number) {
    this._maxCount = num;
  }

  //set and check tweet content length
  set tweetContent(text: string) {
    this._tweetContent = text;
    if (this._tweetContent.length === this.maxCount) {
      this.showMaxLengthErrorMessage = true;
    }
    else this.showMaxLengthErrorMessage = false;
  }

  //post tweet
  postTweet() {
    this.tweetService.postTweet(this.tweetContent)
      .toPromise()
      .then((data) => {
        this.snackBar.open('Tweet was posted', '', { duration: 2000 });
        this.tweetContent = '';
        this.clickOnPostEvent.emit(true);
      })
      .catch((err) => console.log(err))
  }

}
