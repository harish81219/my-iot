import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as feather from 'feather-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
  locationForm: FormGroup;
  filteredStates: any[] = [];
  dropdownVisible: boolean = false;
  locationsList: any[] = [];
  statesData: any[] = [];
  isEdit: boolean = false;
  isModalVisible = false;  // To control modal visibility
  selectedLocationId: number | null = null;  // Store the selected Location ID
  locationList: any[] = [];
  
  editLocationData: any = null;
  isFocused: boolean = false;
  addLocation: string | null = sessionStorage.getItem("addLocation");
  showModal: boolean | undefined;
  // locationList: any;


  onFocus(focusState: boolean) {
    this.isFocused = focusState;
  }


  // cancel(): void {
  //   this.nzMessageService.info('click cancel');
  // }

  // confirm(): void {
  //   this.nzMessageService.info('click confirm');
  // }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) {
    this.locationForm = this.fb.group({
      STATE_NAME: ['', Validators.required],
      CITY: ['', Validators.required],
      LOCATION_NAME: ['', Validators.required],
      ADDRESS: ['', Validators.required],
      LOCATION_CODE: ['', Validators.required],
      LATITUDE: [''],
      LONGITUDE: [''],
      REMARKS: [''],
    
    });


    console.log(this.locationForm,"this is location form")
  }

  ngOnInit(): void {
    this.getStatesData();
    this.fetchLocations();
    this.getLocations();
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;

  
  }



  onSubmit(): void {
    if (this.locationForm.valid) {
      this.http.post<any>('http://localhost:5000/api/addLocation', this.locationForm.value).subscribe(
        response => {
          console.log('API Response:', response);
          this.getLocations();
          this.locationForm.reset();
        },
        (error: any) => {
          console.error('API Error:', error);
        }
      );
    } else {
      console.error('Form is invalid:', this.locationForm.errors);
    }
  }
  


  getLocations(): void {
    
      this.http.get<any>('http://localhost:5000/api/getLocation').subscribe(
        response => {
          console.log('API Response:', response);
          this.locationList = response;
        },
        (error: any) => {
          console.error('API Error:', error);
        }
      );
  
  }
  
  

  // ngAfterViewInit() {
  //   feather.replace();
  // }


  // onSubmit() {
  //   console.log('Submit button clicked');
  //   if (this.locationForm.valid) {
  //     console.log('Form Valid');
  //     const token = sessionStorage.getItem('token');
  //     const headers = new HttpHeaders().set('x-access-token', token ? token : '');
  //     const payload = { ...this.locationForm.value };

  //     console.log(payload,"this is payload")
  
  //     const apiUrl = this.isEdit
  //       ? 'http://202.53.92.37:3500/iotv1/location/updateLocation'
  //       : 'http://202.53.92.37:3500/iotv1/location/insertLocation';
  
  //     this.http.post<any>(apiUrl, payload, { headers }).subscribe(
  //       response => {
  //         console.log('API Response:', response["status"]);
  //         if (response.status === 200 || response.status === '707') {
  //           alert(response.message);
  //           if (this.isEdit) {
  //             const index = this.locationsList.findIndex(loc => loc.id === this.editLocationData.id);


  //             console.log(index,"this is index from 82")
  //             if (index !== -1) {
  //               this.locationsList[index] = { ...payload };

  //             }
  //           } else {
  //             this.fetchLocations(); 
  //           }
  //           this.resetForm();
  //           this.closeModal();
  //         } else {
  //           console.error('Error in API Response:', response.error);
  //         }
  //       },
  //       error => {
  //         console.error('API Error:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Form Invalid');
  //     console.log('Form Errors:', this.locationForm.errors);
  //     for (const controlName in this.locationForm.controls) {
  //       if (this.locationForm.controls.hasOwnProperty(controlName)) {
  //         console.log(`${controlName} Errors:`, this.locationForm.get(controlName)?.errors);
  //       }
  //     }
  //     this.locationForm.markAllAsTouched();
  //   }
  // }
  
  

  fetchLocations() {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const headers = new HttpHeaders().set('x-access-token', token ? token : '');

    this.http.post<any>('http://202.53.92.37:3500/iotv1/location/edgeLocationDropDownList', { id: userId }, { headers }).subscribe(
      response => {
        console.log(response, "this is all locations");
        this.locationsList = response.data.map((item: any) => ({
          id: item.id,
          state: item.state,
          state_id : item.state_id,
          city: item.city,
          location_name: item.location_name,
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude,
          remarks: item.remarks,
          location_code: item.location_code,
          created_by: item.created_by,
          created_on: item.created_on,
          u_ts: item.u_ts,
          is_active: item.is_active,
          list: item.list,
          
        }));
      },
      error => {
        console.error('Api error:', error);
      }
    );
  }

  openEditModal(location: any) {
    this.isEdit = true;
    this.editLocationData = location;
    console.log(this.editLocationData,"editLocationDataeditLocationDataeditLocationData")
    this.locationForm.patchValue({
      id: location.id,
      state: location.state,
      state_id : location.state_id,
      city: location.city,
      location_name: location.location_name,
      address: location.address,
      location_code: location.location_code,
      latitude: location.latitude,
      longitude: location.longitude,
      remarks: location.remarks,
      sub_cat_id: location.sub_cat_id  
    });
    this.openModal();


    console.log( this.editLocationData)
  }


  onOptionSelected(event: any): void {
    const selectedValue = event.value;
    console.log('Selected Name:', selectedValue.name);
    console.log('Selected ID:', selectedValue.id);
  }
  
  getStatesData(): void {
    const token = sessionStorage.getItem("token");

    if (token) {
      const headers = new HttpHeaders().set('x-access-token', token);

      this.http.get<any>('http://202.53.92.37:3500/iotv1/location/listOfStates', { headers }).subscribe(
        response => {
          console.log(response.data, "this is states");
          this.statesData = response.data;
          this.filteredStates = this.statesData;
        },
        error => {
          console.error("Error fetching states data", error);
        }
      );
    } else {
      console.error("Token not found in localStorage");
    }
  }



  navigateToAdd() {
    this.isEdit = false;
    this.editLocationData = null;
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEdit = false;
    this.editLocationData = null;
  }

  resetForm() {
    this.locationForm.reset({
      id: '',
      state: '',
      city: '',
      location_name: '',
      address: '',
      location_code: '',
      latitude: '',
      longitude: '',
      remarks: '',
      sub_cat_id: '' 
    });
  }







   listOfOption: string[] = [];
    listOfSelectedValue = ['a10', 'c12'];
    isVisible = false; // Modal visibility
    isConfirmLoading = false;
  
    listOfSelectedValue1 = [];
    listOfSelectedValue2 = [];
    selectedStream = null;
    dateRange: Date[] = [];
  
    listOfOption1 = ['Sagar Society', 'Vasanth Nagar '];
    listOfOption2 = ['AV Light', 'NE Voltage', 'Temperature Rack A3','Temperature Rack B5','EB'];
    listOfStreams = ['Stream 1', 'Stream 2', 'Stream 3'];
  
    tagPlaceHolder = 'and {{ selectedList.length }} more selected';
  
    openModal(): void {
      this.isVisible = true; // Show modal
    }
  
    handleOk(): void {
      console.log('Submitted:', {
        selectedOption1: this.listOfSelectedValue1,
        selectedOption2: this.listOfSelectedValue2,
        selectedStream: this.selectedStream,
        dateRange: this.dateRange
      });
      this.isConfirmLoading = true;
  
      setTimeout(() => {
        this.isConfirmLoading = false;
        this.isVisible = false; // Hide modal after submit
      }, 2000);
    }
  
    handleCancel(): void {
      this.isVisible = false; 
    }
  
 
  
    listOfColumn = [
      {
        title: 'State Name',
        compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
        priority: false
      },
      {
        title: 'City',
        compare: (a: DataItem, b: DataItem) => a.math - b.math,
        priority: 2
      },
       
      {
        title: 'Location Name',
        compare: (a: DataItem, b: DataItem) => a.math - b.math,
        priority: 2
      },
      {
        title: 'Address',
        compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
        priority: 3
      },
 
      {
        title: 'Latitude',
        compare: (a: DataItem, b: DataItem) => a.english - b.english,
        priority: 1
      },
      {
        title: 'Longitude',
        compare: (a: DataItem, b: DataItem) => a.english - b.english,
        priority: 1
      },
     
  
     
      {
        title: 'Remarks',
        compare: (a: DataItem, b: DataItem) => a.math - b.math,
        priority: 2
      },
      {
        title: 'Time Stamp',
        compare: (a: DataItem, b: DataItem) => a.english - b.english,
        priority: 1
      },
      {
        title: 'Actions',
        compare: (a: DataItem, b: DataItem) => a.english - b.english,
        priority: 1
      }
    ];
    listOfData: DataItem[] = [
      {
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70
      },
      {
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89
      },
      {
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70
      },
      {
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89
      }
    ];
  
  
  
  
  
  
    showModal1(): void {
      this.isVisible = true;
    }

    showModal2(): void {
      this.isVisible = true;
    }
  
    deleteLocation(locationId: number): void {
      if (!confirm('Are you sure you want to delete this location?')) {
        return;
      }
    
      console.log('Deleting location with ID:', locationId); // ✅ Debugging
    
      this.http.post<any>('http://localhost:5000/api/deleteLocation', { LOCATION_ID: locationId }).subscribe(
        response => {
          console.log('API Response:', response);
    
          // ✅ Remove deleted location from UI
          this.locationList = this.locationList.filter((loc: any) => loc.LOCATION_ID !== locationId);
          this.getLocations();
        },
        (error: any) => {
          console.error('API Error:', error);
        }
      );
    }



    onEditLocation(data: any) {
      this.selectedLocationId = data.LOCATION_ID;  // Store the selected Location ID
      this.locationForm.patchValue({
        STATE_NAME: data.STATE_NAME,
        CITY: data.CITY,
        LOCATION_NAME: data.LOCATION_NAME,
        ADDRESS: data.ADDRESS,
        LATITUDE: data.LATITUDE,
        LONGITUDE: data.LONGITUDE,
        REMARKS: data.REMARKS
      });
      this.isModalVisible = true;  // Show the modal
    }
  
    // Function to call API and update data
    updateLocation() {
      if (!this.selectedLocationId) return;
  
      const updatedData = { 
        LOCATION_ID: this.selectedLocationId, 
        ...this.locationForm.value 
      };
  
      this.http.post<any>('http://localhost:5000/api/updateLocation', updatedData).subscribe(
        response => {
          console.log('Update Success:', response);
          this.isModalVisible = false;  // Close the modal
  
          // Update the UI
          this.locationList = this.locationList.map(loc =>
            loc.LOCATION_ID === this.selectedLocationId ? { ...loc, ...updatedData } : loc
          );
        },
        error => console.error('Update Error:', error)
      );
    }
  
    cancel(): void {
      this.nzMessageService.info('click cancel');
    }
  
    confirm(): void {
      this.nzMessageService.info('click confirm');
    }
    

}
