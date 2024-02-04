import { transition, trigger, query, style, stagger, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger("animationMenu", [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateY(-50%)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})

export class HeaderComponent {
  responsiveMenuVisible: Boolean = false;
  pageYPosition: number = 0;
  languageFormControl: FormControl = new FormControl();
  resumeName: string = "";

  constructor(
    private router: Router,
    public analyticService: AnalyticsService,
    public languageService: LanguageService
  ) {}

  // ngOnInit(): void {
  //   this.languageFormControl.valueChanges.subscribe((val) => this.languageService.changeLanguage(val));
  //   this.languageFormControl.setValue(this.languageService.language);
  // }

  scroll(el: any) {
    if (document.getElementById(el)) {
      document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(["/home"]).then(() => document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' }));
    }
    this.responsiveMenuVisible = false;
  }

  downloadResume() {
    this.languageService.translateService.get("Header.resumeName").subscribe((val) => {
      this.resumeName = val;
      let url = window.location.href;
      window.open(url + "/../assets/cv/" + this.resumeName, "_blank");
    })
  }

  sendAnalytics(action: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(action, category, label);
  }

  @HostListener("window.scroll", ["getScrollPosition($event)"])
  getScrollPosition(event: any) {
    this.pageYPosition = window.pageYOffset
  }

  // changeLanguage(language: string) {
  //   this.languageFormControl.setValue(language);
  // }
}
