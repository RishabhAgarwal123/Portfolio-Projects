import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  services = [
    { tech: 'Angular Development', desc: '' },
    { tech: 'React Development', desc: '' },
    { tech: 'NodeJS Development', desc: '' },
    { tech: 'Mobile Development', desc: '' },
    { tech: 'HTML/CSS/JS Development', desc: '' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
