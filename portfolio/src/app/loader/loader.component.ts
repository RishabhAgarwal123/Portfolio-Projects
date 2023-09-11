import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: boolean = true;
  progress: number = 0;
  
  @Output() loadingCompleted = new EventEmitter<void>();

  ngOnInit(): void {
    this.startProgressBar();
  }

  startProgressBar(): void {
    const interval = setInterval(() => {
      this.progress += 1;
      if (this.progress === 100) {
        clearInterval(interval);
        this.isLoading = false;
        this.loadingCompleted.emit(); // Emit the event
      }
    }, 50);
  }

}
