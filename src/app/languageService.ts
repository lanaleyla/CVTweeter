import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(public translate: TranslateService) {
        translate.addLangs(['en', 'it']);
        translate.setDefaultLang('en');
        translate.use(localStorage.getItem("language") ? localStorage.getItem("language") : 'en');
    }

    get availabelLanguages():string[] {
        return this.translate.getLangs();
    }

    get currentLanguage():string{
        return this.translate.currentLang;
    }

    changeLanguage(language: string) {
        localStorage.setItem("language", language);
        this.translate.use(localStorage.getItem("language"));
        console.log(`language has changed to :${this.translate.currentLang}`);
    }

}



