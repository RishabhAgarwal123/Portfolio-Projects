import { Component } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent {
  languages: Array<String> = ['Hindi', 'English'];
  skills: Array<String> = ['HTML', 'CSS', 'JS', 'TS', 'React', 'Angular', 'NodeJS'];
}
