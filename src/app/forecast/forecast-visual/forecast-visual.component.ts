import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { ForecastService } from '../forecast.service';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared-services/expenses.shared-service';
import { Forecast } from '../forecast';
import { first } from 'rxjs';

@Component({
  selector: 'app-forecast-visual',
  templateUrl: './forecast-visual.component.html',
  styleUrl: './forecast-visual.component.css',
  imports: [FormsModule, RouterLink, ChartModule, HighchartsChartModule],
  standalone: true
})
export class ForecastVisualComponent implements OnInit {
    @Input() userId: number | null;

    totalExpensesByAccount: {
      [accountId: number]: number
    } = {};

    categoryExpensesByAccount: {
      [accountId: number]: { [category: string]: number }
    } = {};

    forecast: Forecast | undefined;
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;

    constructor(
      private forecastService: ForecastService,
      private userService: UserService,
      private sharedService: SharedService
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
              // SharedService => récupération des expenses par account
              this.totalExpensesByAccount = this.sharedService.getTotalExpensesByAccount();
              this.categoryExpensesByAccount = this.sharedService.getCategoryExpensesByAccount();
              console.log(this.categoryExpensesByAccount)

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
    foreCast(foodRate: number, transportRate: number, sportRate: number, invoiceRate: number,
      shoppingRate: number, leisureRate: number, realEstateRate: number) {

        let expensesData: { name: string, y: number, color: string }[] = [];

        // Récupération des dépenses du 1er compte du user
        const accountIds: string[] = Object.keys(this.categoryExpensesByAccount);

        if (accountIds.length > 0) {
          const firstAccountId = accountIds[0]; // Utilisez directement l'ID sans conversion
          const firstAccountExpenses = this.categoryExpensesByAccount[+firstAccountId];

          expensesData = [
            { name: "Food Expenses", y: firstAccountExpenses["Food"] || 0, color: 'red' },
            { name: "Transport Expenses", y: firstAccountExpenses["Transport"] || 0, color: 'red' },
            { name: "Sport Expenses", y: firstAccountExpenses["Sport"] || 0, color: 'red' },
            { name: "Invoice Expenses", y: firstAccountExpenses["Invoice"] || 0, color: 'red' },
            { name: "Shopping Expenses", y: firstAccountExpenses["Shopping"] || 0, color: 'red' },
            { name: "Leisure Expenses", y: firstAccountExpenses["Leisure"] || 0, color: 'red' },
            { name: "Real Estate Expenses", y: firstAccountExpenses["RealEstate"] || 0, color: 'red' },
          ];
        }

        // Configuration des options de graphique Highcharts
        this.chartOptions = {
          chart: { type: 'column' },
          title: { text: 'Forecast vs Actual Spending' },
          credits: { enabled: false },
          yAxis: { title: { text: 'Amount' } },
          xAxis: {
            categories: ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'Real Estate']
          },
          series: [
            {
              name: 'Forecast',
              data: [
                { name: "Food", y: foodRate, color: 'green' },
                { name: "Transport", y: transportRate, color: 'green' },
                { name: "Sport", y: sportRate, color: 'green' },
                { name: "Invoice", y: invoiceRate, color: 'green' },
                { name: "Shopping", y: shoppingRate, color: 'green' },
                { name: "Leisure", y: leisureRate, color: 'green' },
                { name: "Real Estate", y: realEstateRate, color: 'green' },
              ],
              pointPadding: 0.3,
            },
            {
              name: 'Actual Spending',
              data: expensesData,
              pointPadding: 0.4,
            }
          ],
          plotOptions: {
            column: {
              grouping: false, // Cela permet de superposer les barres
              shadow: false,
              borderWidth: 0,
            }
          },
        };
    };
};

