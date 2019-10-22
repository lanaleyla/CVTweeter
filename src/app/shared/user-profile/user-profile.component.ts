import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IUser } from '../../core/models/index';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user: IUser;
  constructor(private userService: UserService, private route: ActivatedRoute, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'flash',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flash_on-24px.svg'));
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(p =>
      this.userService.getUserByUserName(p.get('userName'))
        .then((data) => {
          this.user = data
        })
        .catch((err) => { console.log(err) }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get registertiontDate(): string {
    const d = new Date(this.user.registrationDate);
    return d.toLocaleDateString();
  }

  get loginDate(): string {
    const d = new Date(this.user.registrationDate);
    return d.toLocaleDateString();
  }

}
