import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {ChartModule} from "primeng/chart";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-test-by-category',
  standalone: true,
  imports: [
    ChartModule,
    ChartModule
  ],
  templateUrl: './test-by-category.component.html',
  styleUrl: './test-by-category.component.scss'
})
export class TestByCategoryComponent  implements OnInit {
  basicData: any;

  basicOptions: any;
  private router: Router;

  constructor(router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    this.router = router;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initchart();
    }
  }

  initchart(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['JAVA', 'HTML', 'CSS', 'C#'],
      datasets: [
        {
          label: 'Test by users',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
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
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
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
