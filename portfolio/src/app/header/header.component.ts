import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() buttonClickEvent = new EventEmitter<boolean>();
  @Input() isMobileData: boolean = false;

  handleButtonClick() {
    this.buttonClickEvent.emit(!this.isMobileData);
  }
}
