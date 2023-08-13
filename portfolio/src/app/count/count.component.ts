import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  @Input() maxCount !: number;
  count: number = 0;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.startCounter();
  }

  startCounter() {
    this.interval = setInterval(() => {
      if (this.count < this.maxCount) this.count++;
      else this.stopCounter();
    }, 100);
  }

  stopCounter() {
    clearInterval(this.count);
  }

}
