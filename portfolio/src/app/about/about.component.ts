import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  showMobileMenu: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.detectScreenSize();
  }

  ngOnInit() {
    this.detectScreenSize();
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  private detectScreenSize() {
    this.isMobile = window.innerWidth <= 600; // Adjust the threshold based on your requirements
    console.log(this.isMobile)
  }
}
