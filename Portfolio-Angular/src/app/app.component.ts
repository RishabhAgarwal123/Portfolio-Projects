import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { FooterComponent } from './components/general/footer/footer.component';
import { HeaderComponent } from './components/general/header/header.component';

@Component({
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent, FooterComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Portfolio-Angular';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}
