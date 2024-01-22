import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-forecast-visual',
  templateUrl: './forecast-visual.component.html',
  styleUrl: './forecast-visual.component.css',
  imports: [FormsModule, RouterLink, ChartModule, HighchartsChartModule],
  standalone: true
})
export class ForecastVisualComponent implements OnInit, AfterViewInit {
    userId: number | null;
    chart: Chart;
    Highcharts: typeof Highcharts = Highcharts;

    constructor(private el: ElementRef) {}

    async ngOnInit() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(forecastVisualComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){
        this.userId =+ loggedInUserId;
      }
    }

    ngAfterViewInit() {
      this.chart = new Chart({
        chart: {
          type: 'line',
        },
        title: {
          text: 'My Chart',
        },
        series: [
          {
            type: 'waterfall',
            name: 'Series 1',
            data: [1, 2, 3, 4, 5],
          },
        ],

      });
    }
}
