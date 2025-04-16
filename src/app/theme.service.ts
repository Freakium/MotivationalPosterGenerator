import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  isDarkMode() {
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  }
}
