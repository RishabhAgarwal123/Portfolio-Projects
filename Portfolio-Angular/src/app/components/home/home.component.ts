import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './banner/banner.component';
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ AboutComponent, BannerComponent, ExperienceComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
