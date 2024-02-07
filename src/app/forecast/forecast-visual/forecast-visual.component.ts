import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { ForecastService } from '../forecast.service';
import { UserService } from '../../user/user.service';
import { User } from 'src/app/user/user';
import { SharedService } from '../../shared-services/expenses.shared-service';
import { rateToCash, rateToAmount } from '../../utils/expense.util';
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
    @Input() dataLoading: boolean;
    user: User | undefined;
    forecastId: number | null;
    forecast: Forecast | undefined;

    totalExpensesByAccount: { [accountId: number]: number } = {};
    categoryExpensesByAccount: { [accountId: number]: { [category: string]: number } } = {};

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;

    constructor(
      private forecastService: ForecastService,
      private userService: UserService,
      private sharedService: SharedService
      ) {}

    //**************************** INITIALIZATION *****************************/
    ngOnInit() {

      if(this.userId){

          // UserService => récupération du client
          this.userService.getOneUserById(this.userId).subscribe({

            next: (u) => {
              this.userId = u.id;
              console.log("clientId:" + this.userId)

              this.forecastId = u.forecastId;

              if (this.forecastId && this.dataLoading==true) {
                // forecastService => récupération du forecast
                this.loadForecast(this.forecastId);
              }

            },

            error: (error) => console.error('Error fetching user:', error),
          });

      } else {
        console.error('UserId undefined');
      }
    }

    //**************************** FORECAST LOADING *****************************/
    loadForecast(forecastId: number) {

      // ForecastService => récupération du forecast depuis le client
      this.forecastService.getForecastById(forecastId).subscribe({
        next: (forecast) => {
          this.forecast = forecast;
          console.log("forecast:" + this.forecast.id);

          // SharedService => récupération des expenses par account
          this.totalExpensesByAccount = this.sharedService.getTotalExpensesByAccount();
          this.categoryExpensesByAccount = this.sharedService.getCategoryExpensesByAccount();

          // BudgetChart => construction du graphique
          this.budgetChart(
            this.forecast.foodRate,
            this.forecast.transportRate,
            this.forecast.sportRate,
            this.forecast.invoiceRate,
            this.forecast.shoppingRate,
            this.forecast.leisureRate,
            this.forecast.realEstateRate);
        },
        error: (error) => console.error('Error fetching forecast:', error),
      });
    }

    //**************************** BUDGET CHART METHOD *****************************/
    budgetChart(foodRate: number, transportRate: number, sportRate: number, invoiceRate: number,
      shoppingRate: number, leisureRate: number, realEstateRate: number) {

      if(this.forecast){

        //******** EXPENSES DATA *********//
        let expensesData: { name: string, y: number, color: string }[] = [];

        // Object.keys => je récupère tableau des Ids [accountId 1, accountId 2, ...]
        const accountIds: string[] = Object.keys(this.categoryExpensesByAccount);

        if (accountIds.length > 0) {
          const firstAccountId = accountIds[0];

          // Je récupère les dépenses($) par category du 1er account du user
          const firstAccountExpenses = this.categoryExpensesByAccount[+firstAccountId];

          // Je convertis les dépenses en %
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

        //******** FORECAST DATA *********//
        let forecastData: { name: string, y: number, color: string }[] = [];
        let forecastSalary: number;

        forecastData = [
          { name: "Food", y: foodRate, color: '#673AB7' },
          { name: "Transport", y: transportRate, color: '#673AB7' },
          { name: "Sport", y: sportRate, color: '#673AB7' },
          { name: "Invoice", y: invoiceRate, color: '#673AB7' },
          { name: "Shopping", y: shoppingRate, color: '#673AB7' },
          { name: "Leisure", y: leisureRate, color: '#673AB7' },
          { name: "Real Estate", y: realEstateRate, color: '#673AB7' },
        ]


        forecastSalary = this.forecast.salary
        console.log("forecastSalary:"+forecastSalary)


        //******** BUDGET CHART OPTIONS *********//
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: `Salary: <span style="color: #673AB7;">$ ${forecastSalary}</span>`,
            useHTML: true,
          },
          credits: { enabled: false },
          yAxis: { title: { text: 'Amount' } },
          xAxis: {
            categories: ['Food', 'Transport', 'Sport', 'Invoice', 'Shopping', 'Leisure', 'Real Estate'],
            labels: {
              style: {
                fontSize: '1.2 em',
                fontWeight: 'bold'
              },
              y: 50
            }
          },
          legend: {
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal'
          },
          series: [
            {
              name: 'Forecast',
              data: forecastData,
              color: '#673AB7',
              pointPadding: 0.3,
            },
            {
              name: 'Expenses',
              data: expensesData,
              color: 'red',
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
          tooltip: {
            useHTML: true,
            formatter: function(this: Highcharts.Point) {
              if(this.y !== undefined){
                const amount = rateToAmount(this.y, forecastSalary).toFixed(2);
                return `
                  <div style="text-align: center; line-height: 150%; font-size: 1.3em;">
                  <strong style="font-weight: bold;">${this.series.name}</strong><br/>
                  ${this.y} %<br/>
                  $ ${amount}
                  </div>`;
              } else {
                return ''
              }
            },
          }
        };
      };
    };
};

