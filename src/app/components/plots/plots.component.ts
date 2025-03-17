import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
// import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { registerables } from 'chart.js';  // Import registerables
import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


Chart.register(...registerables);


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}


@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],

})
export class PlotsComponent {


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
  

  
  
  
  
  
    constructor(private modalService: NzModalService) {}
  
    showModal1(): void {
      this.isVisible = true;
    }
  
    showModal2(): void {
  
    }
    barChartOptions: ChartOptions = {
      responsive: true
    };
  
    // Chart labels
    barChartLabels: string[] = ['John Brown', 'Jim Green', 'Joe Black', 'Jim Red'];
  
    // Chart data (datasets)
    barChartData: ChartData<'bar'> = {
      labels: this.barChartLabels,
      datasets: [
        { data: [98, 98, 98, 88], label: 'Chinese Score' },
        { data: [60, 66, 90, 99], label: 'Math Score' },
        { data: [70, 89, 70, 89], label: 'English Score' }
      ]
    };
  
    // Chart type
    barChartType: ChartType = 'bar';
}
