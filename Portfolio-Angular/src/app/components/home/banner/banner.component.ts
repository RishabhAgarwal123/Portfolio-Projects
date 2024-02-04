import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('bannerTrigger', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: 'none'})
            ),
          ]),
        ]),
      ]),
    ]),
  ]
})
export class BannerComponent {
  constructor(
    public analyticsService: AnalyticsService
  ) {}

  sendAnalytics(action: string, category: string, label: any) {
    this.analyticsService.sendAnalyticEvent(action, category, label);
  }
}
