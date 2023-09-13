// github-contributions.component.ts
import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github-contribution',
  templateUrl: './github-contribution.component.html',
})
export class GithubContributionComponent implements OnInit {
  contributions: any[] | undefined;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.getContributions('RishabhAgarwal123').subscribe((data: any) => {
      console.log(data)
      this.contributions = data;
    });
  }
}
