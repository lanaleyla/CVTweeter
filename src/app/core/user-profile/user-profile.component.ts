import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { IUser } from '../models/index';
import { UserService } from '../services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user: IUser;
  imageSrc: string;
  constructor(private userService: UserService, private route: ActivatedRoute, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.initializeIcons();
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(p =>//subscribe to current user
      this.userService.getUserByUserName(p.get('userName'))//get the user details
        .then((data) => {
          this.user = data;
          this.setImageSrc();
        })
        .catch((err) => { console.log(err) }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get registertiontDate(): string {
    const d = new Date(this.user.registrationDate);
    return d.toLocaleDateString();//convert date 
  }

  get loginDate(): string {
    const d = new Date(this.user.registrationDate);
    return d.toLocaleDateString();//convert date 
  }

  //set the icons
  initializeIcons() {
    this.iconRegistry.addSvgIcon(
      'flash',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flash_on-24px.svg'));
  }

  //set the user image src
  setImageSrc() {
    if (this.user.image === '') {//set up image
      this.imageSrc = 'assets/images/kind.png'
    }
    else {
      this.imageSrc = `data:image/png;base64,${this.user.image}`;
    }
  }

}
