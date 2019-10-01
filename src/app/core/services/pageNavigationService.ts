import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PageNavigationService {

  constructor(private router: Router, private location: Location) { }

  navigate(page: string) {
    this.router.navigate([page]);
  }

  back() {
    this.location.back();
  }
}


