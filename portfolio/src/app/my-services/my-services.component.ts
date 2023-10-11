import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  services = [
    { tech: 'Angular', desc: "An Angular developer is a front-end developer who focuses on creating websites or applications that meet clients' needs. While Angular developers primarily work with the Angular web application framework, they may also use other versions of Angular that come from TypeScript or AngularJS that comes from JavaScript." },
    { tech: 'React', desc: 'React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.' },
    { tech: 'NodeJS', desc: "Node. js is an open-source, cross-platform, back-end JavaScript runtime environment used to build fast and scalable network applications. It is built on Google Chrome's JavaScript V8 Engine. It executes JavaScript code outside a web browser." },
    { tech: 'Mobile', desc: "React Native is an exciting framework that enables web developers to create robust mobile applications using their existing JavaScript knowledge. It offers faster mobile development, and more efficient code sharing across iOS, Android, and the Web, without sacrificing the end user's experience or application quality." },
    { tech: 'HTML/CSS/JS', desc: "HTML and CSS are actually not technically programming languages; they're just page structure and style information. But before moving on to JavaScript and other true languages, you need to know the basics of HTML and CSS, as they are on the front end of every web page and application." },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
