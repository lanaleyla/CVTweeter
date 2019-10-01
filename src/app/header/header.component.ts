import { Component, OnInit } from '@angular/core';
import { PageNavigationService } from '../core/services/pageNavigationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private navigationService: PageNavigationService) { }

  ngOnInit() {
  }

  display(page: string) {
    this.navigationService.navigate(page);
  }

}
