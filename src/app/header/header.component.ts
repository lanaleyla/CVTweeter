import { Component, OnInit } from '@angular/core';
import { PageNavigationService } from '../core/services/pageNavigationService';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../core/services/loginService';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: Observable<string>;
  email: string;

  constructor(public translate: TranslateService, private navigationService: PageNavigationService, private loginService: LoginService) {
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.userEmail = this.loginService.userEmailObservable;
    this.userEmail.subscribe(
      data => this.email = data //change it to map
    );
  }

  display(page: string) {
    this.navigationService.navigate(page);
  }

  openSidebar(){
    
  }

  logout() {
    this.loginService.email = '';
    localStorage.removeItem('token');
  }

}
