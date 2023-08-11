import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  languages = [
    { lang: 'Hindi', ability: 100 },
    { lang: 'English', ability: 80 }
  ];
  skills = [
    { skill: 'HTML',  ability: 90 },
    { skill: 'CSS',  ability: 80 },
    { skill: 'JS',  ability: 80 },
    { skill: 'TS',  ability: 70 },
    { skill: 'React',  ability: 70 },
    { skill: 'Angular',  ability: 80 },
    { skill: 'NodeJs',  ability: 50 }
  ];

  ngOnInit(): void {
  }
}
