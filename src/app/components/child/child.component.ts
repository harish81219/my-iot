import { Component,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() child : any;
  @Output() childData  = new EventEmitter();


  constructor(){
    console.log(this.child);
  }


  sendData(){
    this.childData.emit("Data From Child")
  }

}
