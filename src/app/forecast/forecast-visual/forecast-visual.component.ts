import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
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
    @Input() userId: number | null;

    forecast: Forecast | undefined;
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;

    constructor(
      private forecastService: ForecastService,
      private userService: UserService
      ) {}

    async ngOnInit() {

      if(this.userId){

        try {
          // UserService => récupération du client
          const client = await this.userService.getOneUserById(this.userId);

          if (client) {
            // ForecastService => récupération du forecast depuis le client
            this.forecast = await this.forecastService.getForecastById(client.forecastId);

            if(this.forecast){
              // ForeCast() => affichage du graphique (données du forecast)
              this.foreCast(
                this.forecast.foodRate,
                this.forecast.transportRate,
                this.forecast.sportRate,
                this.forecast.invoiceRate,
                this.forecast.shoppingRate,
                this.forecast.leisureRate,
                this.forecast.realEstateRate
                );
            }
          }
        } catch (error) {
          console.error('Error fetching forecast:', error);
        }
      }
    }

    /*------------------Method pour afficher le graphique------------------*/
    foreCast(foodRate: number,transportRate: number,sportRate: number,invoiceRate: number,
      shoppingRate: number,leisureRate: number,realEstateRate: number){
        this.chartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Forecast',
          },
          credits:{
            enable: false
          },
          yAxis: {
            title: {
              text: '%',
            }
          },
          plotOptions: {
            column: {
              pointPadding: 0.1,
              groupPadding: 0.1
            }
          },
          series: [
            {name: "Food", data: [foodRate]},
            {name: "Transport", data: [transportRate]},
            {name: "Sport", data: [sportRate]},
            {name: "Invoice", data: [invoiceRate]},
            {name: "Shopping", data: [shoppingRate]},
            {name: "Leisure", data: [leisureRate]},
            {name: "Real Estate", data: [realEstateRate]},
          ]
        }
      }
}
