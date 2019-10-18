import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageNavigationService } from '../core/services/pageNavigationService';
import { LoginService } from '../core/services/loginService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

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

  closeSidebar(){
    
  }

  logout() {
    this.loginService.email = '';
  }

}
