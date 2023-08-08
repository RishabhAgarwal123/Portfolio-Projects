import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadingProgress: number = 0;
  isLoading: boolean = true;

  constructor (private router: Router) {}
  
  ngOnInit(): void {
    const interval = setInterval(() => {
      this.loadingProgress += 1;
      if (this.loadingProgress === 100) {
        clearInterval(interval);
        this.isLoading = false;
        this.navigate(this.isLoading);
      }
    }, 10);
  }

  navigate(loading: boolean): any {
    if (!loading) {
      this.router.navigate(['./page-not-found']);
    }
  }
}
