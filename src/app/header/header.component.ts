import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { PageNavigationService, LoginService } from '../core/services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: Observable<string>;
  name: string;
  sub: Subscription;
  @Output() clickOnMenuEvent = new EventEmitter();

  constructor(public translate: TranslateService, private navigationService: PageNavigationService, private loginService: LoginService) {
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.name='';
    this.userName = this.loginService.userUserNameObservable;
    this.sub = this.userName.subscribe(
      data => this.name = data
    );
    console.log(this.name);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //display chosen page
  display(page: string) {
    this.navigationService.navigate(page);
  }

  //open side bar nav
  openSidebar() {
    this.clickOnMenuEvent.emit(true);
  }

  //user logs out
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    this.loginService.username = '';
  }

}
