import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
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

  showModal(): void {
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
    this.isVisible = false; // Hide modal on cancel
  }

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }

  listOfColumn = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false
    },
    {
      title: 'Chinese Score',
      compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
      priority: 3
    },
    {
      title: 'Math Score',
      compare: (a: DataItem, b: DataItem) => a.math - b.math,
      priority: 2
    },
    {
      title: 'English Score',
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





  constructor(private modalService: NzModalService) {}

  showModal1(): void {
    this.isVisible = true;
  }

  showModal2(): void {

  }


}
