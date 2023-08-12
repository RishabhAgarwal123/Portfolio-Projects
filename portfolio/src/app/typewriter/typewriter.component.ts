import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.scss']
})
export class TypewriterComponent implements OnInit {
  types: string[] = ["Front End Developer", "Web Developer", "Full Stack Developer"];
  currentTypeIndex = 0;
  currentCharIndex = 0;
  currentItem = '';

  ngOnInit(): void {
    this.typeText();
  }

  typeText() {
    if (this.currentCharIndex < this.types[this.currentTypeIndex].length) {
      this.currentItem += this.types[this.currentTypeIndex].charAt(this.currentCharIndex);
      this.currentCharIndex++;
      setTimeout(() => this.typeText(), 100);
    } else {
      setTimeout(() => this.erase(), 1500);
    }
  }

  erase() {
    if (this.currentCharIndex >= 0) {
      this.currentItem = this.types[this.currentTypeIndex].substring(0, this.currentCharIndex);
      this.currentCharIndex--;
      setTimeout(() => this.erase(), 50);
    } else {
      this.currentTypeIndex = (this.currentTypeIndex + 1) % this.types.length;
      setTimeout(() => this.typeText(), 500);
    }
  }
}
