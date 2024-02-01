import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { ForecastService } from '../forecast.service';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared-services/expenses.shared-service';
import { rateToCash } from '../../utils/expense.util';
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

    //**************************** INITIALIZATION *****************************/
    async ngOnInit() {

      if(this.userId){

        try {
          //******** FORECAST FETCH *********//
          // UserService => récupération du client
          const client = await this.userService.getOneUserById(this.userId);
          console.log("clientId:"+client.id)

          if (client) {
            // ForecastService => récupération du forecast depuis le client
            this.forecast = await this.forecastService.getForecastById(client.forecastId);

            if(this.forecast){
              console.log("forecast:"+this.forecast.id)

              //******** EXPENSES FETCH *********//
              // SharedService => récupération des expenses par account
              this.totalExpensesByAccount = this.sharedService.getTotalExpensesByAccount();
              this.categoryExpensesByAccount = this.sharedService.getCategoryExpensesByAccount();

              //******** BUDGET CHART BUILDING *********//
              this.budgetChart(
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

    //**************************** BUDGET CHART METHOD *****************************/
    budgetChart(foodRate: number, transportRate: number, sportRate: number, invoiceRate: number,
      shoppingRate: number, leisureRate: number, realEstateRate: number) {

        //******** EXPENSES DATA *********//
        let expensesData: { name: string, y: number, color: string }[] = [];

        // Object.keys => je récupère [accountId 1, accountId 2, ...]
        const accountIds: string[] = Object.keys(this.categoryExpensesByAccount);

        if (accountIds.length > 0) {
          const firstAccountId = accountIds[0];

          // Je récupère les dépenses($) par category du 1er account du user
          const firstAccountExpenses = this.categoryExpensesByAccount[+firstAccountId];

          // Je convertis les dépenses en %
          if(this.forecast){
            const foodExpenseRate = rateToCash(firstAccountExpenses["Food"], this.forecast.salary)
            const transportExpenseRate = rateToCash(firstAccountExpenses["Transport"], this.forecast.salary)
            const sportExpenseRate = rateToCash(firstAccountExpenses["Sport"], this.forecast.salary)
            const invoiceExpenseRate = rateToCash(firstAccountExpenses["Invoice"], this.forecast.salary)
            const shoppingExpenseRate = rateToCash(firstAccountExpenses["Shopping"], this.forecast.salary)
            const leisureExpenseRate = rateToCash(firstAccountExpenses["Leisure"], this.forecast.salary)
            const realEstateExpenseRate = rateToCash(firstAccountExpenses["RealEstate"], this.forecast.salary)

            // Je crée la data des dépenses pour mon graphique
            expensesData = [
              { name: "Food Expenses", y: foodExpenseRate || 0, color: 'red' },
              { name: "Transport Expenses", y: transportExpenseRate || 0, color: 'red' },
              { name: "Sport Expenses", y: sportExpenseRate || 0, color: 'red' },
              { name: "Invoice Expenses", y: invoiceExpenseRate || 0, color: 'red' },
              { name: "Shopping Expenses", y: shoppingExpenseRate || 0, color: 'red' },
              { name: "Leisure Expenses", y: leisureExpenseRate || 0, color: 'red' },
              { name: "Real Estate Expenses", y: realEstateExpenseRate || 0, color: 'red' },
            ];
          }
        }

        //******** FORECAST DATA *********//
        let forecastData: { name: string, y: number, color: string }[] = [];

        forecastData = [
          { name: "Food", y: foodRate, color: '#673AB7' },
          { name: "Transport", y: transportRate, color: '#673AB7' },
          { name: "Sport", y: sportRate, color: '#673AB7' },
          { name: "Invoice", y: invoiceRate, color: '#673AB7' },
          { name: "Shopping", y: shoppingRate, color: '#673AB7' },
          { name: "Leisure", y: leisureRate, color: '#673AB7' },
          { name: "Real Estate", y: realEstateRate, color: '#673AB7' },
        ]

        //******** BUDGET CHART OPTIONS *********//
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
              data: forecastData,
              pointPadding: 0.3,
            },
            {
              name: 'Expense',
              data: expensesData,
              pointPadding: 0.3,
            }
          ],
          plotOptions: {
            column: {
              grouping: false,
              shadow: false,
              borderWidth: 0,
            }
          },
        };
    };
};

