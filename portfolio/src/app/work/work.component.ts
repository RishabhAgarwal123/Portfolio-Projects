import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  projects: any = [
    { title: 'To Do', link: '#todo', description: 'To Do Application', technology: 'Angular', image: 'url' },
    { title: 'Chat', link: '#chat', description: 'Chat Application', technology: 'React', image: 'url' },
    { title: 'Gym Excercises', link: '#gym', description: '', technology: 'React', image: 'url' },
    { title: 'Natours', link: '#natours', description: 'Travelling Application', technology: 'SASS', image: 'url' },
    { title: 'Nexters', link: '#nexters', description: 'Travelling Application', technology: 'SASS', image: 'url' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
