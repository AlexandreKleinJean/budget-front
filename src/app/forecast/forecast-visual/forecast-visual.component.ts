import { Component, OnInit, ElementRef } from '@angular/core';
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
export class ForecastVisualComponent implements OnInit {
    userId: number | null;
    Highcharts = Highcharts;
    chartOptions = {
      title: {
        text: 'My Chart',
      },
      series: [{
        type: 'line',
        name: 'Series 1',
        data: [1, 2, 3, 4, 5]
      },{
        type: 'column',
        name: 'Series 2',
        data: [11, 22, 33, 44, 55]
      }] as Highcharts.SeriesOptionsType[]
    }

    constructor(private el: ElementRef) {}

    async ngOnInit() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(forecastVisualComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){
        this.userId =+ loggedInUserId;
      }
    }
}
