import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/languageService';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
  }

  get languages() {
    return this.languageService.availabelLanguages;
  }

  get colorB() {
    return 'primary';
  }

  get currrentLanguage() {
    return this.languageService.currentLanguage;
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }
}



