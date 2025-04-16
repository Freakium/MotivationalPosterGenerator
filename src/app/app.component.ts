import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  darkMode: boolean;
  showInstructions = window.location.pathname === '/';

  constructor(private themeService: ThemeService) {
    this.darkMode = this.themeService.isDarkMode();

    // run on initial load
    this.themeService.setDarkMode(this.darkMode);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.themeService.setDarkMode(this.darkMode);
  }
}
