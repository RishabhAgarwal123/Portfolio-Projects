import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  animations: [
    trigger('animateFooter', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: "translateY(100%)"}),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class FooterComponent {
  constructor(public analyticService: AnalyticsService) {}

  sendAnaytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }
}
