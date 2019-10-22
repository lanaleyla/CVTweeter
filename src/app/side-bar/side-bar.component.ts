import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PageNavigationService } from '../core/services/pageNavigationService';
import { LoginService } from '../core/services/loginService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sub: Subscription;
  name: string;
  @Output() clickCloseMenuEvent = new EventEmitter();

  constructor(private navigationService: PageNavigationService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.sub = this.loginService.userUserNameObservable.subscribe(
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

  //preform logout from the system
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    this.loginService.username = '';
  }

}
