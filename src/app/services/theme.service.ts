import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'dark-mode';

  constructor() {
    this.loadTheme(); // Load theme on startup
  }

  /** ✅ Enable Dark Mode */
  enableDarkMode(): void {
    document.body.classList.add('dark-mode');
    localStorage.setItem(this.darkModeKey, 'true');
  }

  /** ✅ Disable Dark Mode */
  disableDarkMode(): void {
    document.body.classList.remove('dark-mode');
    localStorage.setItem(this.darkModeKey, 'false');
  }

  /** ✅ Toggle Dark Mode */
  toggleDarkMode(): void {
    if (document.body.classList.contains('dark-mode')) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  /** ✅ Load Dark Mode from Local Storage */
  loadTheme(): void {
    const isDarkMode = localStorage.getItem(this.darkModeKey) === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }
}
