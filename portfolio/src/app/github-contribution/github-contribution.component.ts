// github-contributions.component.ts
import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github-contribution',
  templateUrl: './github-contribution.component.html',
  styleUrls: ['./github-contribution.component.scss']
})
export class GithubContributionComponent implements OnInit {
  days: { date: string, contribution: boolean }[] = [];
  contributions!: any[]; 

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    // Fetch GitHub Contributions data here
    this.githubService.getContributions('RishabhAgarwal123').subscribe((data: any) => {
      console.log(data);
      this.contributions = data;

      // After fetching data, generate contributions
      this.generateContributionsForYear(2023);
    });
  }

  generateContributionsForYear(year: number) {
    const currentDate = new Date(year, 0, 1); // January 1st of the given year
    for (let i = 0; i < 365; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);

      // Check if there's a contribution for this date
      let isContribution = false;
      if (this.contributions) {
        isContribution = this.contributions?.some((contribution: any) => {
          const contributionDate = new Date(contribution.date);
          return date.toISOString() === contributionDate.toISOString();
        });
      }

      this.days.push({ date: date.toISOString(), contribution: isContribution });
    }
  }
}
