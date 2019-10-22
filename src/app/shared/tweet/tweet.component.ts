import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ITweet } from '../../core/models/index';
import { PageNavigationService, LoginService, TweetsService } from '../../core/services/index'; //change to index
import { ReplyComponent } from '../reply/reply.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: ITweet;
  user: Observable<string>; //when user is logged in
  userName: string;
  deleteOption: boolean = false;
  _imageSrc: string = '';
  constructor(private domSanitizer: DomSanitizer, public dialog: MatDialog, private tweetService: TweetsService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private navigationService: PageNavigationService, private loginService: LoginService, private snackBar: MatSnackBar) {
    this.InitalizeIcons();
  }

  ngOnInit() {
    this.user = this.loginService.userUserNameObservable;
    if (this.tweet.userName === localStorage.getItem('userName')) {
      this.deleteOption = true;
    }
    if (this.tweet.userImage === '') {
      this.imageSrc = 'assets/images/kind.png'
    } else {
      this.imageSrc = `data:image/png;base64,${this.tweet.userImage}`;
    }
  }

  get imageSrc(): string {
    return this._imageSrc;
  }

  set imageSrc(value: string) {
    this._imageSrc = value;
  }

  //get a string represantation of tweets date
  get tweetDate(): string {
    const d = new Date(this.tweet.date);
    return d.toLocaleDateString();
  }

  //redirect to users profile page
  showUserProfile() {
    this.navigationService.navigate(`profile/${this.tweet.userName}`);
  }

  reply() {
    this.openDialog();
  }

  //star a tweet
  startTweet() {
    this.tweetService.starATweet(this.tweet.id)
      .then((data) => console.log(data))
      .catch(err => {
        if (err.status === 401)
          this.navigationService.navigate('login');
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReplyComponent, {
      width: 'auto',
    });
  }

  //Delete tweet
  deleteTweet() {
    if (confirm("Delete this tweet?")) {
      this.tweetService.deleteTweet(this.tweet.id)
        .then(() => {
          this.snackBar.open('Tweet was deleted', '', { duration: 2000 });
        })
        .catch(err => {
          if (err.error === 'not the owner error' && err.status === 403) {
            this.snackBar.open('You can not delete this tweet', '', { duration: 2000 });
          }
          else {
            this.snackBar.open('Problem with deleting tweet', '', { duration: 2000 });
          }
        })
    }
  }

  //Initialize icons view
  InitalizeIcons() {
    this.iconRegistry.addSvgIcon(
      'star',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/grade-24px.svg'));
    this.iconRegistry.addSvgIcon(
      'flash',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flash_on-24px.svg'));
    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete-24px.svg'));
    this.iconRegistry.addSvgIcon(
      'reply',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/reply-24px.svg'));
  }
}
