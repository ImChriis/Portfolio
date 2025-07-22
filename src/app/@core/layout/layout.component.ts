import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  scrollTo(section: string){
    const element = document.getElementsByClassName(section)[0];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
  