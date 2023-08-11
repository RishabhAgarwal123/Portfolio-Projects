import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit {
  constructor() { }
  
  ngOnInit(): void {
  }
  @Input() progressValue !: number;
  circumference = 339;

  // Calculate the stroke dash offset based on the progress
  get progressOffset() {
    return this.circumference - (this.progressValue / 100) * this.circumference;
  }

}
