import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageNavigationService } from '../services/pageNavigationService';
import { LoginService } from '../services/loginService';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sub: Subscription;
  name: string;
  @Output() clickCloseMenuEvent = new EventEmitter(); //on side bar close event

  constructor(private navigationService: PageNavigationService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.sub = this.loginService.userUserNameObservable.subscribe(//subscribe to logged in username
      data => this.name = data 
    );
  }

  //navigate to chosen page
  display(page: string) {
    this.navigationService.navigate(page);
  }

  //close side bar
  closeSidebar() {
    this.clickCloseMenuEvent.emit(false);
  }

  //preform logout from the system (clear the local storage)
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    this.loginService.username = '';
  }
}
