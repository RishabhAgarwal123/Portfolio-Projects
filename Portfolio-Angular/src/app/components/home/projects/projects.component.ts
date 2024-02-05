import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CarouselModule ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  @ViewChild("imgContainer")
  imgContainer!: ElementRef<any>;

  constructor(public analyticService: AnalyticsService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000
  }

  projects = {
    title: 'Prominent Project',
    projectDetails: [
      {
        "id": 0,
        "Title": "Disney Visa Card Promotion Page",
        "Description": "The website serves as a promotional platform for the Disney® Premier Visa® Card, a credit card tailored for fans of Disney and its associated brands. It offers an array of financial incentives and rewards aimed at enhancing the Disney experience for its cardholders. With a robust sign-up bonus, tiered rewards system, and exclusive member benefits, the site targets individuals planning Disney vacations or frequent expenditures on Disney-related products and services. The website aims to provide comprehensive information for potential customers, encapsulating everything from the card's utility for Disney vacations to its everyday use-cases. Overall, the project serves as a one-stop-shop for prospective cardholders to understand the card's financial and experiential benefits.",
        "imgs": [
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png"
        ],
        "demoLink": "https://disneyworld.disney.go.com/visa-card/",
        "Technologies": [
          "HTML/HTML5",
          "CSS/CSS3",
          "LESS",
          "Angular",
          "AngularJS",
          "RxJS",
          "NodeJS",
          "Jenkins",
          "AWS",
          "Git",
          "Jira",
          "Figma",
          "Ultron"
        ]
      },
      {
        "id": 1,
        "Title": "CoreBridge Software",
        "Description": "CoreBridge Software specializes in business management solutions that enhance efficiency and streamline operations. Offering tools for workflow automation, customer relationship management, and real-time analytics, the platform is designed for seamless integration and scalability. Suitable for businesses of all sizes, CoreBridge aims to empower organizations with data-driven decision-making and optimized processes.",
        "imgs": [
          "assets/images/bc.jpeg",
          "assets/images/bc.jpeg",
          "assets/images/bc.jpeg",
          "assets/images/bc.jpeg",
          "assets/images/bc.jpeg",
          "assets/images/bc.jpeg"
        ],
        "demoLink": "https://corebridge.net/about-us/",
        "Technologies": [
          "HTML/HTML5",
          "CSS/CSS3",
          "LESS",
          "Angular",
          "Azure",
          "C#",
          ".NET",
          "Entity Framework",
          "Bootstrap",
          "PrimeNG",
          "Git",
          "Jira",
          "Bitbucket",
          "Zeplin",
          "Figma"
        ]
      },
      {
        "id": 2,
        "Title": " Kodaris Supply Chain Platform",
        "Description": "The Supply Chain Platform offers a robust set of features designed to streamline and optimize supply chain operations for both end-users and administrators. Users can easily shop for supplies, track their orders in real-time, and access valuable content through the integrated CMS. On the other hand, administrators benefit from a comprehensive dashboard that provides real-time analytics, stock inventory management, and user activity tracking. With functionalities ranging from demand forecasting and vendor management to reporting and analytics, the platform serves as a one-stop solution for businesses looking to improve their supply chain efficiency and customer satisfaction.",
        "imgs": [
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png"
        ],
        "demoLink": "https://www.kodaris.com/",
        "Technologies": [
          "HTML",
          "CSS",
          "LESS",
          "Angular",
          "Angular Material",
          "Bootstrap",
          "Java",
          "Git",
          "Bitbucket"
        ]
      },
      {
        "id": 3,
        "Title": "Lingotek Language Translation System",
        "Description": "The Document Translation and Review Application serves as a comprehensive platform for both automated and customized translation services. Users can upload their documents and choose between the platform's advanced auto-translate feature or opt for custom translation by assigned linguists. These linguists then proceed through various stages such as 'Translate,' 'Review,' and 'Custom,' and their work is subjected to peer voting and review to ensure quality and accuracy. Additionally, the application offers an automated review feature for contracts and deals in multiple languages, ensuring that vital contextual elements are neither omitted nor lost in translation. This multi-faceted approach makes the platform a robust solution for individuals and businesses with diverse translation and review needs.",
        "imgs": [
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png",
          "assets/images/AvatarImage-1.png"
        ],
        "demoLink": "https://lingotek.com/",
        "Technologies": [
          "CoffeeScript",
          "AngularJS",
          "JQuery",
          "Jade/Pug",
          "Stylus",
          "Angular Material",
          "Webpack",
          "Git",
          "Bitbucket",
          "JIRA",
          "Docker",
          "Java",
          "NodeJS"
        ]
      }
    ],
  }

  debug() {
    this.imgContainer.nativeElement.scroll({
      top: this.imgContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

  sendAnalytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }
}
