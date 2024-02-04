import { Component } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ NgbModalModule, NgbNavModule ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  active: Number = 0;
  experiences = {
    title: 'Working Experience',
    jobs: [
      {
        id: 0,
        tab: 'Vorro India',
        title: 'Front End Developer',
        date: 'Feb 2023 - Present',
        description: [
          'Utilized HTML, CSS, JavaScript, React, and Material UI to develop a flexible data transformation tool named BridgeGate.',
          'The tool facilitated seamless data processing, leading to a significant 40% reduction in data processing time.',
          'Leveraged React component-based architecture to create a user-friendly interface for efficient data manipulation.',
          'Implemented streamlined processes for extracting data from diverse sources, ensuring compatibility with various formats and structures.',
          'Dynamic transformation algorithms were applied to enhance data accuracy, resulting in a notable 25% improvement.',
          'Utilized JavaScript flexibility to perform on-the-fly data modifications based on user-defined rules and requirements.'
        ]
      },
      {
        id: 1,
        tab: 'Deloitte USI',
        title: 'Consultant',
        date: 'Jan 2022 - Jan 2023',
        description: [
          'Led the development of a Waste Management application focused on tracking daily driver hours and schedules.',
          'Implemented robust functionalities to effectively monitor and manage driver activities, resulting in a notable 20% reduction in scheduling errors.',
          'Leveraged a diverse tech stack including HTML, CSS, JavaScript, TypeScript, Angular, React, and Bootstrap to create a comprehensive solution.',
          'Innovatively developed features for precise hour tracking and comprehensive reporting within the application.',
          'Leveraged advanced JavaScript and TypeScript functionalities to implement accurate tracking mechanisms.',
          'The introduction of these features resulted in a substantial 30% increase in operational efficiency and data accuracy.',
          'Spearheaded ongoing enhancements and refinements to the Waste Management application based on user feedback and industry best practices.',
          'Implemented agile methodologies to adapt to changing requirements and ensure the application scalability and relevance over time.',
          'The commitment to continuous improvement and innovation played a key role in achieving operational excellence and driving positive business outcomes.'
        ]
      },
      {
        id: 2,
        tab: 'Capgemini',
        title: 'Senior Software Engineer',
        date: 'Mar 2019 - Jan 2022',
        description: [
          'Genie: Conceptualized and developed Genie, an innovative search engine tailored specifically for bankers, facilitating secure and seamless access to databases. Orchestrated the seamless integration of document and file management systems, consolidating resources for more efficient access and utilization. Implemented robust permission management protocols to ensure secure file sharing within the platform, fostering collaboration while safeguarding data integrity.',
          'RMSAdmin: Oversaw and optimized teams spanning diverse regions, resulting in a 15% increase in sales through strategic resource allocation. Introduced an automated reporting system that streamlined operations and reduced administrative workload by 25%.',
          'AIQUIC: Led the successful integration of AIQUIC, leading to a notable 30% reduction in account analysis time. Enhanced user satisfaction by delivering a 20% increase in accurate financial insights, leveraging AI-driven analytics.',
          'FNOL: Directed the integration of FNOL for accident insurance, which streamlined claims processing and slashed average claim settlement time by 40%. Improved customer retention by resolving accident insurance claims with an impressive 95% accuracy rate, contributing to overall client satisfaction and loyalty.'
        ]
      },
    ]
  };

  constructor(public analyticService: AnalyticsService) { }

  sendAnalytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }
}
