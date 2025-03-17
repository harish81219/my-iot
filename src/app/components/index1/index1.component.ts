import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css']
})
export class Index1Component {

  recognition: any;
  isListening = false;
  userText: string = '';
  responseText: string = '';
  chartOptions: any;
  barChartOptions: any; 
  lineChartOptions: any;
  pieChartOptions: any;
  cards = [
    { cardClass: 'card-primary', icon: 'fas fa-ticket-alt', category: 'Open Tickets', value: '10' },
    { cardClass: 'card-info', icon: 'fas fa-user-check', category: 'Subscribers', value: '1303' },
    { cardClass: 'card-success', icon: 'fas fa-chart-pie', category: 'Sales', value: '$ 1,345' },
    { cardClass: 'card-secondary', icon: 'far fa-check-circle', category: 'Order', value: '576' }
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }



  constructor() {
    this.renderCharts();
    this.renderPi();
    this.chartOptions = {
      series: [
        {
          name: "Row 1",
          data: this.generateRandomData(24) // 24 columns for Row 1
        },
        {
          name: "Row 2",
          data: this.generateRandomData(24) // 24 columns for Row 2
        }
      ],
      chart: {
        height: 300,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],  // Customize colors if needed
      xaxis: {
        type: "category",
        categories: this.generateHours(24) // Generate 24 time slots
      },
      title: {
        text: "HeatMap Chart (2 Rows, 24 Columns)"
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
  }

  // Function to generate 24 random values for a row
  generateRandomData(columns: number) {
    return Array.from({ length: columns }, (_, index) => ({
      x: `${index}:00`, // Hour format
      y: Math.floor(Math.random() * 100) // Random value between 0-100
    }));
  }

  // Function to generate 24-hour format labels
  generateHours(columns: number) {
    return Array.from({ length: columns }, (_, index) => `${index}:00`);
  }


  renderPi(){
    this.pieChartOptions = {
      series: [35, 25, 15, 10, 15], // New data for the pie chart
      chart: {
        type: "pie", // Specify pie chart
        height: 430
      },
      labels: ["Electronics", "Clothing", "Groceries", "Accessories", "Books"], // New categories for pie slices
      dataLabels: {
        enabled: true // Display data labels on the chart
      },
      title: {
        text: "Sales Distribution by Category" // Updated title for the pie chart
      }
    };
    
  }



  renderCharts() {
    this.barChartOptions = {
      series: [
        {
          name: "Product A",
          data: [44, 55, 41, 67, 22, 43, 21]
        },
        {
          name: "Product B",
          data: [53, 32, 33, 52, 13, 44, 32]
        }
      ],
      chart: {
        type: 'bar', // Change chart type to bar
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: false, // Vertical bars
          columnWidth: "50%", // Adjust width
          endingShape: 'rounded' // Rounded bars
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    };
  }


  

  }



