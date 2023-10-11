import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: any = [
    {
      company: 'Vorro India',
      location: 'Gurugram, Haryana',
      time: 'Feb, 2023 - Present',
      info: 'Vorro is the integration and automation solutions provider of choice for various industries like healthcare, e-commerce, and insurance. Our BridgeGate Enterprise Integration Platform As A Service (EiPaaS) simplifies any to any integration and automates business processes.'
    },
    {
      company: 'Deloitte USI',
      location: 'Gurugram, Haryana',
      time: 'Jan, 2022 - Jan, 2023',
      info: 'Deloitte is a leading global provider of audit and assurance, consulting, financial advisory, risk advisory, tax, and related services.'
    },
    {
      company: 'Capgemini',
      location: 'Pune, Maharashtra',
      time: 'Mar, 2019 - Jan, 2022',
      info: 'Capgemini partners with companies to transform and manage their business by unlocking the value of technology. As a leading strategic partner to companies around the world, we have leveraged technology to enable business transformation for more than 50 years.'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
