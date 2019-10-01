import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweet } from 'src/app/core/models';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  list = [
    {
      "id": "1",
      "userName": "lana",
      "date": "12/10/15",
      "content": "love enriqe iglesias",
      "numberOfStars": 0
    },
    {
      "id": "12",
      "userName": "anastasia",
      "date": "14/10/16",
      "content": "love dancing",
      "numberOfStars": 0
    }
  ]
  tweetsList: Observable<ITweet[]>;
  constructor() { }

  ngOnInit() {
  }

}
