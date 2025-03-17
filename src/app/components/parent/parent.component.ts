import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concat,debounce,debounceTime,distinctUntilChanged,from, switchMap } from 'rxjs';



@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  searchControl = new FormControl('');

constructor(private http: HttpClient) {
  this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(searchValue => this.http.get(`https://api.example.com/search?query=${searchValue}`))

  ).subscribe(res => console.log(res))

 }

  ngOnInit(): void {
 


//     const apiurl =[
//       'https://api.example.com/endpoint1',
//       'https://api.example.com/endpoint2',
//       'https://api.example.com/endpoint3',
//       'https://api.example.com/endpoint1',
//       'https://api.example.com/endpoint2',
//       'https://api.example.com/endpoint3',

//     ]


//  const data = apiurl.map(url => this.http.get(url));
//  concat(...data).subscribe(res => console.log(res));

       
  }





}
