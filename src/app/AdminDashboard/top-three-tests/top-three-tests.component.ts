import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-three-tests',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './top-three-tests.component.html',
  styleUrl: './top-three-tests.component.scss'
})
export class TopThreeTestsComponent implements OnInit {
  testStatisticsData: any; // Updated data property
  chartOptions: any;
  private router: Router;

  constructor(router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.router = router;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeChart();
    }
  }

  initializeChart() {
    if (!isPlatformBrowser(this.platformId)) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.testStatisticsData = {
      labels: ['Java', 'HTML', 'CSS', 'C#', 'Python'], // Test categories
      datasets: [
        {
          label: 'Total Participants',
          data: [1200, 950, 1100, 700, 1300],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        },
        {
          label: 'Average Score',
          data: [75, 85, 70, 60, 90],
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Participants / Average Score',
            color: textColor
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          title: {
            display: true,
            text: 'Test Categories',
            color: textColor
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}

