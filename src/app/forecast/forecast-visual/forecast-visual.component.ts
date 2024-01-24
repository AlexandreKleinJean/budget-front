import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { SeriesOptions } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ForecastService } from '../forecast.service';
import { UserService } from 'src/app/user/user.service';
import { Forecast } from '../forecast';

@Component({
  selector: 'app-forecast-visual',
  templateUrl: './forecast-visual.component.html',
  styleUrl: './forecast-visual.component.css',
  imports: [FormsModule, RouterLink, ChartModule, HighchartsChartModule],
  standalone: true
})
export class ForecastVisualComponent implements OnInit {
    userId: number | null;
    forecast: Forecast | undefined;
    Highcharts = Highcharts;
    chartOptions = {
      title: {
        text: 'My Chart',
      },
      xAxis: {
        categories: ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'Real Estate'],
      },
      yAxis: {
        title: {
          text: 'Rate (%)',
        }
      },
      series: [
        { type: 'column', name: 'Food', data: [] as number[] },
        { type: 'column', name: 'Transport', data: [] as number[] },
        { type: 'column', name: 'Sport', data: [] as number[] },
        { type: 'column', name: 'Invoice', data: [] as number[] },
        { type: 'column', name: 'Shopping', data: [] as number[] },
        { type: 'column', name: 'Leisure', data: [] as number[] },
        { type: 'column', name: 'Real Estate', data: [] as number[] },
        { type: 'line', name: 'Salary', data: [] as number[] },
      ] as Highcharts.SeriesOptionsType[]
    }

    constructor(
      private forecastService: ForecastService,
      private userService: UserService
      ) {}

    async ngOnInit() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(forecastVisualComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){
        this.userId =+ loggedInUserId;

        try {
          // UserService => récupération du client
          const client = await this.userService.getOneUserById(this.userId);
          if (client) {
            // ForecastService => récupération du forecast
            this.forecast = await this.forecastService.getForecastById(client.forecastId);
            if(this.forecast){
              // Highcharts => graphique adaptée aux données

              if (this.forecast) {
                // Récupérer les données de Forecast
                const { salary, foodRate, transportRate, sportRate, invoiceRate, shoppingRate, leisureRate, realEstateRate } = this.forecast;

                // Remplir les séries avec les données
                /*this.chartOptions.series[0].data = [salary];
                this.chartOptions.series[1].data = [foodRate];
                this.chartOptions.series[2].data = [transportRate];
                this.chartOptions.series[3].data = [sportRate];
                this.chartOptions.series[4].data = [invoiceRate];
                this.chartOptions.series[5].data = [shoppingRate];
                this.chartOptions.series[6].data = [leisureRate];
                this.chartOptions.series[7].data = [realEstateRate];*/
              }

            }
          } else {
            console.log("No user with id" + this.userId)
          }

        } catch (error) {
          console.error('Error fetching forecast:', error);
        }
      }
    }
}
