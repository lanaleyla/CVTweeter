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

  display(page: string) {
    this.navigationService.navigate(page);
  }

  closeSidebar() {
    this.clickCloseMenuEvent.emit(false);
  }

  logout() {
    localStorage.removeItem('userName');
    this.loginService.username = '';
  }

}
