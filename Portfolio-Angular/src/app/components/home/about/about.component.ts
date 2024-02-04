import { Component } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(public analyticService: AnalyticsService) { }

  about: any = {
    title: 'About Me',
    paras: ['Welcome to my personal portfolio! With over five years of experience as a full stack developer, I bring a wealth of knowledge and expertise to the table. My journey in the realm of web development has been a fascinating exploration of various technologies and methodologies. From crafting seamless user experiences on the front end to architecting robust server-side solutions, I have immersed myself in every aspect of the development lifecycle.',
      'In my career, I have embraced challenges as opportunities for growth and innovation. My experience spans across a spectrum of projects, ranging from dynamic web applications to scalable e-commerce platforms. Leveraging agile methodologies, I have collaborated closely with cross-functional teams to deliver high-quality software solutions that meet and exceed client expectations. With a keen eye for detail and a passion for clean, efficient code, I take pride in creating solutions that not only solve problems but also elevate user experiences.',
      'As a lifelong learner, I thrive in environments that encourage continuous growth and exploration. I am deeply committed to staying abreast of emerging technologies and industry trends, constantly seeking out new tools and techniques to enhance my skill set. My portfolio is a testament to my dedication to excellence, showcasing a diverse range of projects that demonstrate my ability to tackle complex challenges with creativity and precision. Thank you for visiting my portfolio, and I invite you to explore the projects and experiences that have shaped my journey as a full stack developer.']
  }

  sendAnalytics(path: string, category: string, label: any) {
    this.analyticService.sendAnalyticEvent(path, category, label);
  }
}
