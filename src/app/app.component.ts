import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweeter';
  openSideBar=false;

  //open and close side bar on event
  handleSideBar(event){
    this.openSideBar = event;
  }
}
