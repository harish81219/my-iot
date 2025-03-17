
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
// import { SharedDataService } from 'src/app/services/shared-data.service';

// import player from 'lottie-web';
// import { AnimationOptions } from 'ngx-lottie';

interface SensorType {
  sensorId: number;
  sensor_type: string;
  gateway_location: string;
}

interface DeviceType {
  deviceId: number;
  device_type: string;
  deviceLocation: string;
  location_name : string;
  sensorId: number;
  gateway_location: string;
}

interface Device {
  sensorId: number | null;
  deviceId: number | null;
  device_name: string;
  display_name: string;
  deviceCode: string;
  deviceLocation: string;
  
  deviceData?: DeviceType[];
}


interface FormContainer {
  group_id: FormControl<string>;
  checkBox1: FormControl<boolean>;
  checkBox2: FormControl<boolean>;
  checkBox3: FormControl<boolean>;
  checkBox4: FormControl<boolean>;
}





interface Location {
  id: number;
  location_name: string;
}


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
// export class AddDeviceComponent {
//   return player;
// }


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})


export class AddDeviceComponent implements OnInit {
onSensorTypeChange($event: any,_t115: number) {
throw new Error('Method not implemented.');
}
next() {
throw new Error('Method not implemented.');
}
done() {
throw new Error('Method not implemented.');
}
pre() {
throw new Error('Method not implemented.');
}
  // @ViewChild('firstDrawer') firstDrawer!: MatDrawer; 
  // @ViewChild('secondDrawer') secondDrawer!: MatDrawer;
  // lottieOptions: AnimationOptions = {
  //   path: '../assets/images/Animation - 1724689551059.json', 
  // };
  
  form: FormGroup;
  formContainersArray: FormArray;
  myForm: FormGroup;
  formContainers: any[] = [{}];
  showFormContainer = false;
  selectedDeviceId: number | null = null;
 battery_id : number | null= null;
 current = 0;
  


  responseDataEb: SensorType[] = [];
  responseDevices: DeviceType[] = [];
  statesData: any[] = [];
  filteredStates: any[] = [];
  dropdownVisible: boolean = false;

  device = { device_type: '', sensor_type: null };
  device_name = { device_name: '', sensor_type_id: null };
  locations: Location[] = [];
  addDevice : string | null= sessionStorage.getItem('addDevice');
  isAlert : boolean = false;
  errorAlert : boolean = false;
  upsModal : boolean = false;
  drawerOpened = false;
  // isLoading : boolean = false;
  isFirstDrawerOpen = true;
  isSecondDrawerOpen = false;

  formData: {
    location_id: number;
    gatewayName: string;
    gatewayId: string;
    gateway_location: string;
    devices: Device[];
  } = {
    location_id: 0,
    gatewayName: '',
    gatewayId: '',
    gateway_location: '',
    devices: [
      
    ]
  };

  devices: any[] = [];
  pagedDevices: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  showModal: boolean = false;
loading: Boolean = false;
  

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder,private formBuilder: FormBuilder,
    //  private sharedDataService: SharedDataService
    ) {
    this.myForm = this.fb.group({
      inputField: [''],
      checkBox1: [false],
      checkBox2: [false],
      checkBox3: [false],
      checkBox4: [false]
    });
    this.form = this.fb.group({
      formContainers: this.fb.array([this.createFormGroup()])
    });
    this.formContainersArray = this.form.get('formContainers') as FormArray;

    this.form = this.fb.group({
      ip: ['', Validators.required],
      skipPing: [false],
      version: [''],
      community_string: [''],
      transport: [''],
      port: [null],
      battery_capacity_ah: [''],
      device_info_id: [null],
      battery_id: [[]],
    });
    
    

    
  }


  nextStep(): void {
    if (this.current < 2) {
      this.current++;
    }
  }
  
  prevStep(): void {
    if (this.current > 0) {
      this.current--;
    }
  }



  createFormGroup(): FormGroup {
    return this.fb.group({
      inputField: [''],
      checkBox1: [false],
      checkBox2: [false],
      checkBox3: [false],
      checkBox4: [false]
    });
  }

  getBatteryOptions(index: number): number[] {
    const start = index * 4 + 1;
    return Array.from({ length: 4 }, (_, i) => start + i);
  }



  
  addMore() {
    const control = this.formBuilder.group({
      deviceCode: [''],
      location_id: ['']
    });
  
    this.formContainersArray.push(control);
  }
  
  remove() {
    if (this.formContainersArray.length > 1) {
      this.formContainersArray.removeAt(this.formContainersArray.length - 1);
    }
  }
  

  onDeviceChange(deviceId: number | null) {
    this.showFormContainer = (deviceId === 4);
  }



  ngOnInit(): void {
    // const locationId = parseInt(sessionStorage.getItem('location_id') || '0', 10);
    this.fetchLocations();
    // feather.replace();
    // this.sensortypes();
    // this.userBasedSensors(1);

    // if (locationId) {
    //   this.fetchDevices(locationId);
    // } else {
    //   console.error('No valid location_id found in local storage');
    // }

    this.myForm = this.fb.group({
      inputField: [''],
      checkBox1: [false],
      checkBox2: [false],
      checkBox3: [false],
      checkBox4: [false]
    });
    // this.initializeDevices();

    // this.devices = this.sharedDataService.getDevices();
    console.log('Devices data on init:', this.devices);

  }


  // initializeDevices(): void {
  //   const devices = [
  //     { deviceId: 'device1', sensorId: 'sensor1', deviceCode: 'code1', deviceLocation: 'location1' },
    
  //   ];

  //   this.sharedDataService.setDevices(devices);
  //   console.log('Devices initialized:', devices);
  // }
  
  navigateToAdd() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openDrawer() {
    this.drawerOpened = true;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pages.length) {
      return;
    }

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.devices.length - 1);

    this.pagedDevices = this.devices.slice(startIndex, endIndex + 1);
    this.currentPage = page;
  }

  get pages() {
    return Array(Math.ceil(this.devices.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }


  openSecondDrawer() {
    this.isSecondDrawerOpen = true;
    // this.firstDrawer.close(); // Optionally close the first drawer if needed
  }

    /***************************
 * Function      : fetchData
 * Description   : Showing Devices List
 * Type          : post Api
 * Developed By  : Harish
 **************************/ 




  // userBasedSensors(locationId: number) {
  //   const token = sessionStorage.getItem('token');
  //   const userId = sessionStorage.getItem('userId')

  //   if (token) {
  //     const headers = new HttpHeaders().set('x-access-token', token);
  //     const body = { id: userId};
  //     // this.isLoading= true;

  //     this.http.post<any>('http://202.53.92.37:3500/iotv1/devicedata/getUserDeviceList', body, { headers }).subscribe(
  //       response => {
  //         console.log('API Response:', response);
  //         const deviceData = response.data;
  //         if (Array.isArray(deviceData)) {
  //           this.devices = deviceData.map((device: any) => ({
  //             deviceType: device.device_type,
  //             status: 'Active',
  //             location_name : device.location_name,
  //             display_name : device.display_name,
  //             device_location : device.device_location
  //           }));
  //           this.setPage(1);
  //           // this.isLoading= false;

  //         }
  //       },
  //       error => {
  //         console.error('API Error:', error);
  //         // this.isLoading= false;
  //       }
  //     );
  //   } else {
  //     console.error('Token not found in localStorage');
  //   }
  // }


      /***************************
 * Function      : fetchLocations
 * Description   : getting Locations List
 * Type          : post Api
 * Developed By  : Harish
 **************************/ 































  fetchLocations() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('x-access-token', token);

      this.http.get<any>('http://202.53.92.37:3500/iotv1/location/locatinData', { headers }).subscribe(
        response => {
          const locationData = response.data;
          if (Array.isArray(locationData)) {
            this.locations = locationData.map((loc: any) => ({ id: loc.id, location_name: loc.location_name }));
          } else if (locationData && locationData.location_name) {
            this.locations = [{ id: locationData.id, location_name: locationData.location_name }];
          }
        },
        error => {
          console.error('API Error:', error);
        }
      );
    } else {
      console.error('Token not found in localStorage');
    }
  }


  // sensortypes(): void {
  //   const userId = sessionStorage.getItem('userId');
  //   const token = sessionStorage.getItem('token');

  //   if (!token) {
  //     console.error('Token not available.');
  //     return;
  //   }

  //   const apiUrl = 'http://202.53.92.37:3500/iotv1/gatewayinfo/listOfSensorTypes';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'x-access-token': token
  //   });

  //   this.http.post<any>(apiUrl, { id: userId }, { headers }).subscribe(
  //     async (response) => {

  //       for (const item of response.data) {
  //         await this.Devicetypes(item.sensorId);

  //       }

  //       this.responseDataEb = response.data.map((item: any) => ({
  //         sensorId: item.sensorId,
  //         sensor_type: item.sensor_type,
  //         gateway_location: item.gateway_location
  //       }));

  //     },
  //     (error) => {
  //       console.error('POST Error:', error);
  //     }
  //   );
  // }

  // Devicetypes(sensorId: number): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const userId =  sessionStorage.getItem('userId');
  //     const token = sessionStorage.getItem('token');

  //     if (!token) {
  //       console.error('Token not available.');
  //       reject('Token not available');
  //       return;
  //     }

  //     const apiUrl = 'http://202.53.92.37:3500/iotv1/gatewayinfo/listOfDeviceTypes';
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'x-access-token': token
  //     });

  //     this.http.post<any>(apiUrl, { id: userId, sensorId: sensorId }, { headers }).subscribe(
  //       (response) => {
  //         this.responseDevices = response.data.map((item: any) => ({
  //           deviceId: item.deviceId,
  //           device_type: item.device_type,
  //           locationName : item.device_type,
  //           deviceLocation: item.deviceLocation,
  //           sensorId: item.sensorId,
  //           gateway_location: item.gateway_location
  //         }));
  //         resolve();
  //       },
  //       (error) => {
  //         console.error('POST Error:', error);
  //         reject(error);
  //       }
  //     );
  //   });
  // }

  // onSensorTypeChange(sensorId: number | null, index: number): void {
  //   if (sensorId !== null) {
  //     this.formData.devices[index].sensorId = sensorId;
  
  //     this.Devicetypes(sensorId).then(() => {
  //       this.formData.devices[index].deviceData = this.responseDevices;
  //       this.formData.devices[index].deviceId = null;
  
  //       if (this.responseDevices.length > 0) {
  //         this.formData.devices[index].deviceId = this.responseDevices[0].deviceId;
  //       }
  
  //       console.log(this.formData.devices[index], "Updated device data");
  //     }).catch(error => {
  //       console.error('Error fetching device types:', error);
  //     });
  //   } else {
  //     console.error('Sensor ID cannot be null');
  //   }
  // }
  
  
  fetchDevices(sensorId: number): Promise<any[]> {
    const locationId = 1; 
  
    return new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not available.');
        reject('Token not available');
        return;
      }
  
      const apiUrl = 'http://202.53.92.37:3500/iotv1/gatewayinfo/listOfDeviceTypes';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
  
      this.http.post<any>(apiUrl, { location_id: locationId, sensorId: sensorId }, { headers }).subscribe(
        response => {
          const deviceData = response.data.map((item: any) => ({
            deviceId: item.deviceId,
            device_type: item.device_type,
            deviceLocation: item.deviceLocation,
            sensorId: item.sensorId,
            location_name : item.location_name,
            gateway_location: item.gateway_location
          }));
          resolve(deviceData);
        },
        error => {
          console.error('POST Error:', error);
          reject(error);
        }
      );
    });
  }
  

  onSubmit(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }
  
    const headers = new HttpHeaders().set('x-access-token', token);
  
    // Fetch additional devices from the service
    // const additionalDevices = this.sharedDataService.getDevices();
    // console.log('Additional devices from SharedDataService:', additionalDevices);
  
    // Merge devices from formData with additional devices
    // const mergedDevices = [
    //   ...this.formData.devices,
    //   ...additionalDevices
    // ];
    // console.log('Merged devices data:', mergedDevices);
  
    // Get form controls and check for null values
    const deviceInfoIdControl = this.form.get('device_info_id');
    const batteryIdControl = this.form.get('battery_id');
    const ipControl = this.form.get('ip');
    const versionControl = this.form.get('version');
    const communityStringControl = this.form.get('community_string');
    const transportControl = this.form.get('transport');
    const portControl = this.form.get('port');
    const batteryCapacityAhControl = this.form.get('battery_capacity_ah');
  
    // Safely retrieve values, defaulting to empty values if controls are null
    const device_info_id = deviceInfoIdControl ? deviceInfoIdControl.value : null;
    const battery_id = batteryIdControl ? batteryIdControl.value : [];
    const ip = ipControl ? ipControl.value : '';
    const version = versionControl ? versionControl.value : '';
    const community_string = communityStringControl ? communityStringControl.value : '';
    const transport = transportControl ? transportControl.value : '';
    const port = portControl ? portControl.value : null;
    const battery_capacity_ah = batteryCapacityAhControl ? batteryCapacityAhControl.value : '';
  
    // Construct the data to send
    const dataToSend = {
      location_id: this.formData.location_id,
      gatewayName: this.formData.gatewayName,
      gatewayId: this.formData.gatewayId,
      gateway_location: this.formData.gateway_location,
      // devices: mergedDevices.map(device => ({
      //   deviceId: device.deviceId,
      //   sensorId: device.sensorId,
      //   deviceCode: device.deviceCode,
      //   deviceLocation: device.deviceLocation
      // })),
      device_info_id,
      battery_id,
      snmp_code: 1, // Example fixed value
      ip,
      version,
      community_string,
      transport,
      port,
      batteries: battery_id.length, // Example value based on selected batteries
      battery_capacity_ah,
      is_active: 1 // Example fixed value
    };
  
    console.log('Data to send to API:', dataToSend);
  
    // Make the API call
    this.http.post<any>('http://202.53.92.37:3500/iotv1/gatewayinfo/insertgtwyInfo', dataToSend, { headers })
      .subscribe(
        response => {
          if (response.status === 200) {
            this.isAlert = true;
            setTimeout(() => this.isAlert = false, 5000);
          } else if (response.status === 707) {
            this.errorAlert = true;
            setTimeout(() => this.errorAlert = false, 5000);
          } else {
            console.error('Unexpected API response status:', response.status);
          }
        },
        error => {
          console.error('API Error:', error);
        }
      );
  }
  

  
  

  closeAlert() {
    this.isAlert = false;
  }

  addDevices() {
    this.formData.devices.push({
      sensorId: null,
      deviceId: null,
      device_name: '',
      display_name: '',
      deviceCode: '',
      deviceLocation: '',
      deviceData: []
    });
  }
  
  

  removeDevice(index: number) {
    this.formData.devices.splice(index, 1);
  }
  

}
