import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: "es" | "en" = "es";
  constructor(
    public translateService: TranslateService,
    private location: Location
  ) { }

  initLanuage() {
    this.translateService.addLangs(["es", "en"]);
    let language = navigator.language || (navigator as any).userLanguage;
    language = "en";
    this.translateService.setDefaultLang(language);

    this.location.go(language);

    this.language = language;
  }

  changeLanguage(language: any) {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language
  }
}
