import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import * as moment from 'moment';

@Component({
  selector: 'app-github-contribution',
  templateUrl: './github-contribution.component.html',
  styleUrls: ['./github-contribution.component.scss']
})
export class GithubContributionComponent implements OnInit {
  days: { date: string, color: string, title: string }[] = [];
  contributions: any = [];

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    // Fetch GitHub Contributions data here
    this.githubService.getContributions('RishabhAgarwal123').subscribe((data: any) => {
      // this.contributions = data?.contributions?.map((contribution: any) => contribution.date));
      this.contributions = data?.contributions;

      // After fetching data, generate contributions
      this.generateContributionsForYear(2023);
    });
  }

  generateContributionsForYear(year: number) {
    for (let i = 0; i < this.contributions?.length; i++) {
      const contribution = this.contributions[i];
      const color = this.findColor(contribution?.level);
      const date = this.formatDate(contribution?.date);
      let title = ''

      if (contribution?.level === 0) title = `No contribution on ${date}`;
      else if (contribution?.level === 1) title = `${contribution?.level} contribution on ${date}`;
      else title = `${contribution?.level} contributions on ${date}`;

      this.days.push({ date: date, color: color, title: title });
    }
  }

  findColor(level: number): string {
    let color = '';
    if (level === 1) color = '#57bfff';
    else if (level === 2) color = '#2faafb';
    else if (level === 3) color = '#0797f7';
    else if (level === 4) color = '#0083e3';
    else if (level > 4) color = '#006fcf';
    return color;
  }

  formatDate(date: string) {
    const [year, month, day] = date.split('-').map(Number);

    // Create a Moment.js object
    const dateObject = moment(`20${year}-${month}-${day}`);

    // Format the date as "MMMM, Do"
    return dateObject.format('MMMM, Do');
  }
}