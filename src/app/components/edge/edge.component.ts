import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables, ScriptableContext, TooltipItem, ChartDataset } from 'chart.js';
import { MatrixController, MatrixElement, MatrixOptions } from 'chartjs-chart-matrix';

// Define a custom type for the data points
type CustomMatrixDataPoint = {
  x: number;
  y: number;
  v: number;
};

// Register all chart types and the matrix plugin
Chart.register(...registerables, MatrixController, MatrixElement);

@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {
  ngOnInit(): void {
    const ctx = document.getElementById('temperatureCanvas') as HTMLCanvasElement;

    if (ctx) {
      const context = ctx.getContext('2d');
      if (context) {
        // Generate random data for the heatmap
        const heatmapData: CustomMatrixDataPoint[] = [];
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < 5; j++) {
            heatmapData.push({
              x: i,
              y: j,
              v: Math.random() * (35 - 15) + 15, // Random temperatures
            });
          }
        }

        const temperatureData = {
          datasets: [
            {
              label: 'Temperature Heatmap',
              data: heatmapData,
              width: 55, // Adjust width for each cell
          height: 70,
              borderRadius: 0, // No rounded corners
              anchorX: 'center',
              anchorY: 'center',
              borderWidth: 0, // No border between cells
              backgroundColor: (ctx: ScriptableContext<'matrix'>) => {
                const value = (ctx.raw as CustomMatrixDataPoint).v;
                const alpha = Math.min(1, Math.max(0, (value - 15) / 20)); // Ensure alpha is between 0 and 1
                const red = Math.round(255 * (1 - alpha));
                const blue = Math.round(255 * alpha);
                return `rgba(${red}, 132, ${blue}, 0.8)`;
              },
            } as ChartDataset<'matrix', CustomMatrixDataPoint[]>,
          ],
        };

        const chartOptions: ChartConfiguration<'matrix', CustomMatrixDataPoint[], unknown>['options'] = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              ticks: {
                stepSize: 1,
                font: {
                  size: 16,
                  family: 'Arial',
                  weight: 'bold',
                },
                color: 'black',
              },
              title: {
                display: true,
                text: 'Hour',
                color: '#000',
                font: {
                  family: 'Arial',
                  size: 20,
                  weight: 'bold',
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              ticks: {
                stepSize: 1,
                font: {
                  size: 16,
                  family: 'Arial',
                  weight: 'bold',
                },
                color: 'black',
                callback: (value: string | number) => `Location ${Number(value) + 1}`, // Ensure value is treated as a number
              },
              title: {
                display: true,
                text: 'Location',
                color: '#000',
                font: {
                  family: 'Arial',
                  size: 20,
                  weight: 'bold',
                },
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: TooltipItem<'matrix'>) => {
                  const value = (tooltipItem.raw as CustomMatrixDataPoint).v;
                  return `Temperature: ${value.toFixed(1)} °C`;
                },
              },
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'black',
                font: {
                  family: 'Arial',
                  size: 16,
                },
              },
            },
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
        };

        const temperatureConfig: ChartConfiguration<'matrix', CustomMatrixDataPoint[], unknown> = {
          type: 'matrix',
          data: temperatureData,
          options: chartOptions as MatrixOptions,
        };

        new Chart(context, temperatureConfig);
      }
    }
  }
}
