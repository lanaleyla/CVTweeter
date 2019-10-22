import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ITweet } from '../../core/models/index';
import { PageNavigationService, LoginService, TweetsService } from '../../core/services/index'; 
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: ITweet;
  user: Observable<string>; 
  deleteOption: boolean = false;
  _imageSrc: string = '';
  constructor(public dialog: MatDialog, private tweetService: TweetsService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private navigationService: PageNavigationService, private loginService: LoginService, private snackBar: MatSnackBar) {
    this.InitalizeIcons(); //set icons of a tweet
  }

  ngOnInit() {
    this.user = this.loginService.userUserNameObservable;//get logged in user observable 
    if (this.tweet.userName === localStorage.getItem('userName')) { //check if current tweet is of this user
      this.deleteOption = true; //enabel delete option
    }
    this.setImageSrc();//set user image
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

  //open reply dialog to create new reply tweet
  reply() {
    this.openDialog();
  }

  //star a tweet
  startTweet() {
    if (this.tweet.starByMe === true) {//update current view of number of stars
      this.tweet.numberOfStars -= 1;
    } else {
      this.tweet.numberOfStars += 1;
    }
    this.tweetService.starATweet(this.tweet.id)//update in data base
      .then((data) => console.log(data))
      .catch(err => {
        if (err.status === 401)
          this.navigationService.navigate('login');
      })
  }

  //open dialog window
  openDialog(): void {
    const dialogRef = this.dialog.open(ReplyComponent, {
      width: 'auto', height: 'auto',
    });
  }

  //Delete tweet
  deleteTweet() {
    if (confirm("Delete this tweet?")) {//confirm tweet deletion
      this.tweetService.deleteTweet(this.tweet.id)
        .then(() => {
          this.snackBar.open('Tweet will be deleted', '', { duration: 2000 });
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

  //set image src of the tweet with user image
  setImageSrc() {
    if (this.tweet.userImage === '') { //set image of user 
      this.imageSrc = 'assets/images/kind.png'
    } else {
      this.imageSrc = `data:image/png;base64,${this.tweet.userImage}`;
    }
  }
}
