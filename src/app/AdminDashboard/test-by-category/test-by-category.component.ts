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
      labels: ['Node.js', 'React', 'CSS', 'PHP'],
      datasets: [
        {
          label: 'TestModel by users',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgb(175,108,95)',  // Tomate
            'rgb(0, 255, 255)',  // Cyan vif
            'rgb(187, 28, 107)',  // Hot pink
            'rgb(69,106,197)'    // Lime vert
          ],
          borderColor: [
            'rgb(175,108,95)',  // Tomate
            'rgb(0, 255, 255)',  // Cyan vif
            'rgb(255, 105, 180)', // Hot pink vif
            'rgb(69,106,197)'    // Lime vert vif
          ],



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
