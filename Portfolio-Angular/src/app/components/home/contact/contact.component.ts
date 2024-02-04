import { Component } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public analyticService: AnalyticsService) { }

  sendAnalytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }
}
