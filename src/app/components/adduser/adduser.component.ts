// import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import * as feather from 'feather-icons';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

import { Component } from "@angular/core";

// import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
//   @Input() checked: boolean = false;
//   @Output() toggleChange = new EventEmitter<boolean>();
//   userId: string | null = sessionStorage.getItem("userId");
//   // addUser: string | null = sessionStorage.getItem("addUser");
//   isAlert: boolean = false;
//   isLoading = false;
//   usernamePattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$';
//   passwordPattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$';



//   locations: { id: number, location_name: string }[] = [];
//   isPasswordVisible = false;
//   isConfirmPasswordVisible = false;
//   showAlert = false;
//   userData: FormGroup | undefined;
//   isFocused: boolean = false;
// formFields: any;
// reporting: any;
// reportingManagers: any;
//   locationList: any;

//   onFocus(focused: boolean) {
//     this.isFocused = focused;
//   }

//   constructor(private fb: FormBuilder, private http: HttpClient) { }

//   ngOnInit(): void {
//     this.fetchLocations();


//     this.userData = this.fb.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       username: ['', Validators.required],
//       confirm_password: ['', Validators.required], // Renamed for consistency
//       password: ['', Validators.required], // Renamed for consistency
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]], // Assuming 10-digit phone numbers
//       role_name: ['', Validators.required], // Updated to match your schema
//       reporting: ['', Validators.required],
//       access_stations: ['', Validators.required], // Updated to match DB field
//       add_device: [false], // Boolean value for checkbox
//       add_location: [false],
//       add_user: [false],
//       created_by: [this.userId ? this.userId : ''] // Assigning userId if available
//     });

//     // const userId = sessionStorage.getItem("userId");
//     // if (userId !== null) {
//     //   this.userId = userId;
//     //   this.userData.created_by = this.userId;
//     //   console.log(this.userId, "this is userId");
//     // } else {
//     //   console.error("userId not found in localStorage");
//     // }
//   }



//   adduser(): void {
//     if(this.userData && this.userData.valid){
//       this.http.post<any>('http://localhost:5000/api/addUser',this.userData.value).subscribe(
//         response => {
//           console.log('API Response:', response);
//           this.locationList = response;
//         },
//         (error: any) => {
//           console.error('API Error:', error);
//         }
//       );

//     }
    
 

// }





//   togglePasswordVisibility(): void {
//     this.isPasswordVisible = !this.isPasswordVisible;
//   }

//   toggleConfirmPasswordVisibility(): void {
//     this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
//   }

//   checkUsernameValidity(username: any): void {
//     if (username.invalid && (username.dirty || username.touched)) {
//       alert('Username must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
//     }
//   }


//   onKeyPress(event: KeyboardEvent) {
//     const allowedChars = /[0-9]/;
//     if (!allowedChars.test(event.key)) {
//       event.preventDefault();
//     }
//   }


//   /***************************
//  * Function      : onSubmit
//  * Description   : Submitting inputs data 
//  * Type          : post Api
//  * Developed By  : Harish
//  **************************/ 


//   onSubmit(): void {
//     // if (this.userData.pwd !== this.userData.confirmPwd) {
//     //   this.showAlert = true;
//     //   return;
//     // }

//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       console.error('Token not found in localStorage');
//       return;
//     }
//     this.isLoading = true;
//     const headers = new HttpHeaders().set('x-access-token', token);
//     this.http.post<any>('http://202.53.92.37:3500/iotv1/user/userdata', this.userData, { headers }).subscribe(
//       response => {
//         console.log(response);
//         if (response && response.status === 200 ) {
//         this.isAlert = true; 
//         this.isLoading = false;


//         setTimeout(() => {
//           this.isAlert = false; 
//         },5000);
//           // this.resetForm();
//         }
//       },
//       error => {
//         console.error('API Error:', error);
//         this.isLoading = false;
//       }
//     );
//   }

//   closeAlert() {
//     this.isAlert = false; 

//   }

//   // resetForm(): void {
//   //   this.userData = {
//   //     "firstname": "",
//   //     "lastname": "",
//   //     "username": "",
//   //     'confirmPwd': '',
//   //     "pwd": "",
//   //     "email": "",
//   //     "mobile": "",
//   //     "role": "",
//   //     "reporting": "",
//   //     "locationid": "",
//   //     "add_device": "",
//   //     "add_location": "",
//   //     "add_user": "",
//   //     "created_by": this.userId ? this.userId : ""
//   //   };
//   //   this.showAlert = false; // Reset the alert state
//   // }

//   // ngAfterViewInit() {
//   //   feather.replace();
//   // }

//   onToggleAddDevice(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     if (this.userData) {
//       this.userData.patchValue({ add_device: inputElement.checked ? '1' : '0' });
//     }
//   }

//   onToggleAddUser(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     // this.userData.add_user = inputElement.checked ? '1' : '0';
//     if (this.userData) {
//       this.userData.patchValue({ add_location: inputElement.checked ? '1' : '0' });
//     }
//   }

//   onToggleAddLocation(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     if (this.userData) {
//       this.userData.patchValue({ add_location: inputElement.checked ? '1' : '0' });
//     }
//   }



  
//   /***************************
//  * Function      : fetchLocations
//  * Description   : Getting Locations Data
//  * Type          : post Api
//  * Developed By  : Harish
//  **************************/ 

  

//   fetchLocations(): void {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const headers = new HttpHeaders().set('x-access-token', token);

//       this.http.get<any>('http://202.53.92.37:3500/iotv1/location/locatinData', { headers }).subscribe(
//         response => {
//           console.log('API Response:', response);
//           const locationData = response.data;
//           if (Array.isArray(locationData)) {
//             this.locations = locationData.map((loc: any) => ({ id: loc.id, location_name: loc.location_name }));
//           } else if (locationData && locationData.location_name) {
//             this.locations = [{ id: locationData.id, location_name: locationData.location_name }];
//           }
//         },
//         error => {
//           console.error('API Error:', error);
//         }
//       );
//     }
//   }

//   onLocationChange(): void {
//     if (this.userData && this.userData.get('locationid')) {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         const headers = new HttpHeaders().set('x-access-token', token);

//         this.http.get<any>(`http://202.53.92.37:3500/iotv1/location/${this.userData.get('locationid')?.value}`, { headers }).subscribe(
//           response => {
//             console.log('API Response:', response);
//           },
//           error => {
//             console.error('API Error:', error);
//           }
//         );
//       }
//     }
//   }

}
