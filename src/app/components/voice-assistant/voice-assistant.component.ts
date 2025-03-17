import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexGrid } from "ng-apexcharts";

@Component({
  selector: 'app-voice-assistant',
  templateUrl: './voice-assistant.component.html',
  styleUrls: ['./voice-assistant.component.css'],
})
export class VoiceAssistantComponent implements OnInit {
  recognition: any;
  isListening = false;
  userText: string = '';
  responseText: string = '';
  chartOptions: any;


  ngOnInit(): void {
    this.setupSpeechRecognition();
  }



  constructor() {
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


  
  setupSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.responseText = "Listening...";
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userText = transcript;
      this.respondToCommand(transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.responseText = 'Error: ' + event.error;
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
    }
  }





  respondToCommand(command: string) {
    command = command.toLowerCase();

    if (command.includes('hello')) {
      this.responseText = "Hello! How can I assist you?";
    } else if (command.includes('time')) {
      const currentTime = new Date().toLocaleTimeString();
      this.responseText = `The current time is ${currentTime}`;
    } else if (command.includes('date')) {
      const currentDate = new Date().toLocaleDateString();
      this.responseText = `Today's date is ${currentDate}`;
    } else {
      this.responseText = "Sorry, I didn't understand that.";
    }

    this.speakResponse(this.responseText);
  }

  speakResponse(text: string) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }
}
