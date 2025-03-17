import { Component } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isLoggingOut = false;
  isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}




  lottieOptions: AnimationOptions = {
    path: '/assets/img/Animation - 1741349424822.json'
  };



  constructor(private router: Router) {}

  logout() {
    this.isLoggingOut = true;
  
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
 

}
