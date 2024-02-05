import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-other-projects',
  standalone: true,
  imports: [],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.scss'
})
export class OtherProjectsComponent {
  otherProjects = [
    {
      "id": 0,
      "Title": "Toronto Recycling Quiz App",
      "Description": "An ios quiz application about Recycling in Toronto. Allows user to pick their answer. View the result of the quiz. Allows multiple attempts until the user pass the quiz.",
      "ghLink": "https://github.com/annrobles/QuizApp",
      "demoLink": "https://github.com/annrobles/QuizApp",
      "Technologies": [
        "Swift",
        "iOS"
      ]
    },
    {
      "id": 1,
      "Title": "Habit Tracker App",
      "Description": "An android habit tracker application, allows users to build a certain habit. User can track and update their habits. Users can also view leaderboard and community.",
      "ghLink": "https://github.com/annrobles/Habit-Tracker",
      "demoLink": "https://github.com/annrobles/Habit-Tracker",
      "Technologies": [
        "Android",
        "Java",
        "FireBase",
        "Google Cloud",
        "ROM"
      ]
    }
  ]
  constructor(private router: Router, public analyticService: AnalyticsService) { }

  sendAnalytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;
      window.scrollTo(0, 0);
    });
  }

  redirect(route: string, event: any) {
    const id = event.target.id;
    if (id === 'demoLink' || id === 'ghLink') return;
    window.open(route, "_blank");
  }
}
