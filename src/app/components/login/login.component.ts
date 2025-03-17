import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as feather from 'feather-icons';
// import { TransferService } from 'src/app/transfer.service';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  private inactivityTimer: any;
  private readonly inactivityDuration = 120 * 60 * 1000; 
  isLoading : boolean = true;
  loginCred : any;
isLoggingIn: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    // private transfer : TransferService
  ) { }


  options: AnimationOptions = {
    path: '/assets/img/Animation - 1741266267955.json',
    
  };


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ngAfterViewInit() {
  //   feather.replace();
  //   this.startInactivityTimer(); 
  // }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keydown', ['$event'])
  onUserActivity(event: Event): void {
    console.log('User activity detected:', event.type); 
    this.resetInactivityTimer();
  }

  private startInactivityTimer(): void {
    this.resetInactivityTimer(); 
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer); 
    }
    this.inactivityTimer = setTimeout(() => {
      this.logout(); 
    }, this.inactivityDuration);
    console.log('Inactivity timer reset'); 
  }

  private logout(): void {
    console.log('Logging out due to inactivity'); 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  onLogin() {
 
      this.isLoggingIn = true; 

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000); 
    }
  
  
  Login(): void {

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // const loginData = this.loginForm.value;
    // this.isLoading = true;
    // this.http.post<any>('http://202.53.92.37:3500/iotv1/login', loginData).subscribe(
    //   response => {
    //     console.log(response,"this is from Login")

    //     if (response && response.data && response.data.length > 0) {

    //       this.loginCred = response.data[0]
    //       // this.transfer.setItem(this.loginCred); 
    //       console.log(response.data[0],"response.data[0]")
    //     } else {
    //       console.error('No valid data received from API');
    //     }

    //             if (response.status === 200 && response.data) {
    //       const token = response.data[0].token;
    //       sessionStorage.setItem('token', token);
    //       sessionStorage.setItem('userId', response.data[0].user_id);
    //       sessionStorage.setItem('roleId', response.data[0].role_id);
    //       sessionStorage.setItem('addDevice', response.data[0].add_device);
    //       sessionStorage.setItem('addUser', response.data[0].add_user);
    //       sessionStorage.setItem('addLocation', response.data[0].add_location);



        
       

         
    //       this.startInactivityTimer();
    //       this.isLoading = false;
    //     } else {
    //       alert('Please Check Your Credentials');
    //       this.isLoading = false;
    //     }
    //   },
    //   error => {
    //     console.log('Login error', error);
    //     alert('An error occurred during login. Please try again.');
    //   }
    // );
  }
}
