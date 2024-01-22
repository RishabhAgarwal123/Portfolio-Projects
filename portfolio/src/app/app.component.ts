import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appLoaded: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.detectScreenSize();
  }

  ngOnInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    this.isMobile = window.innerWidth <= 600; // Adjust the threshold based on your requirements
  }
}
