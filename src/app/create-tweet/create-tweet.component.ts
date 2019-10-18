import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})
export class CreateTweetComponent implements OnInit {

  _tweetContent: string;
  _maxCount: number;
  showMaxLengthErrorMessage:boolean=false;
  constructor() { }

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

  set tweetContent(text: string) {
    this._tweetContent = text;
    if (this._tweetContent.length === this.maxCount) {
     this.showMaxLengthErrorMessage=true;
    }
    else this.showMaxLengthErrorMessage=false;
  }

  set maxCount(num: number) {
    this._maxCount = num;
  }

  get errorMessage() {
    return 'You have reached to maximum number of charachters allowed!';
  }
}
