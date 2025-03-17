import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {
isDarkMode: any;
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }


  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

}
