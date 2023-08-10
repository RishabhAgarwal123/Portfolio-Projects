import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.initializeScrollbar();
  }

  initializeScrollbar(): void {
    const container = this.elementRef.nativeElement;
    const option = {
      damping: 0.05,
      renderByPixel: true,
      continuousScrolling: true
    }
    Scrollbar.init(container, option)
  }

}
