import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { ForecastService } from '../forecast.service';
import { UserService } from '../../user/user.service';
import { User } from 'src/app/user/user';
import { ExpensesStorageService } from '../../shared-services/expensesStorage.service';
import { rateToCash, rateToAmount, amountByCategoryFusion } from '../../utils/expense.util';
import { Forecast } from '../forecast';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-forecast-visual',
  templateUrl: './forecast-visual.component.html',
  styleUrl: './forecast-visual.component.css',
  imports: [FormsModule, RouterLink, ChartModule, HighchartsChartModule],
  standalone: true
})
export class ForecastVisualComponent implements OnInit {
    @Input() userId: number | null;
    user: User | undefined;
    forecastId: number | null;
    forecast: Forecast | undefined;

    expensesByAccount: { [accountId: number]: number } = {};
    globalExpensesByCategory: { [category: string]: number } = {};

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;

    constructor(
      private forecastService: ForecastService,
      private userService: UserService,
      private storageService: ExpensesStorageService,
      private behaviorService: BehaviorService
      ) {}

    //**************************** INITIALIZATION *****************************/
    ngOnInit() {

      this.behaviorService.dataIsLoaded$.subscribe(dataLoaded => {
        if (dataLoaded) {

          if(this.userId){

              // UserService => récupération du client
              this.userService.getOneUserById(this.userId).subscribe({

                next: (u) => {

                  // Je récupère forecastId depuis le client
                  this.forecastId = u.forecastId;

                  if (this.forecastId) {
                    this.loadForecast(this.forecastId);
                  }
                },

                error: (error) => console.error('Error fetching user:', error),
              });

          } else {
            console.error('UserId undefined');
          }
        }
      })
    }

    //**************************** FORECAST LOADING *****************************/
    loadForecast(forecastId: number) {

      // ForecastService => récupération du forecast depuis le client
      this.forecastService.getForecastById(forecastId).subscribe({
        next: (forecast) => {
          this.forecast = forecast;
          console.log("Forecast ID :", this.forecast.id);

          // SharedService => récupération des expenses par compte
          this.expensesByAccount = this.storageService.getExpensesByAccount();

          // StorageService => récupération des dépenses par category par account
          const expensesByCategoryByAccount = this.storageService.getExpensesByCategoryByAccount();

          // Util method => fusion des comptes = dépenses globales par category
          this.globalExpensesByCategory = amountByCategoryFusion(expensesByCategoryByAccount);

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

    //**************************** GRAPHIC METHOD *****************************/
    budgetChart(foodBudget: number, transportBudget: number, sportBudget: number, invoiceBudget: number,
      shoppingBudget: number, leisureBudget: number, realEstateBudget: number) {

      if(this.forecast){

        //******** EXPENSES DATA *********//
        let expensesData: { name: string, y: number, color: string }[] = [];

          // Je convertis les dépenses en %
          const foodExp = rateToCash(this.globalExpensesByCategory["Food"], this.forecast.salary)
          const transportExp = rateToCash(this.globalExpensesByCategory["Transport"], this.forecast.salary)
          const sportExp = rateToCash(this.globalExpensesByCategory["Sport"], this.forecast.salary)
          const invoiceExp = rateToCash(this.globalExpensesByCategory["Invoice"], this.forecast.salary)
          const shoppingExp = rateToCash(this.globalExpensesByCategory["Shopping"], this.forecast.salary)
          const leisureExp = rateToCash(this.globalExpensesByCategory["Leisure"], this.forecast.salary)
          const realEstateExp = rateToCash(this.globalExpensesByCategory["RealEstate"], this.forecast.salary)

          // Je crée la data des dépenses pour mon graphique
          expensesData = [
            { name: "Food Expenses", y: foodExp || 0, color: 'red' },
            { name: "Transport Expenses", y: transportExp || 0, color: 'red' },
            { name: "Sport Expenses", y: sportExp || 0, color: 'red' },
            { name: "Invoice Expenses", y: invoiceExp || 0, color: 'red' },
            { name: "Shopping Expenses", y: shoppingExp || 0, color: 'red' },
            { name: "Leisure Expenses", y: leisureExp || 0, color: 'red' },
            { name: "Real Estate Expenses", y: realEstateExp || 0, color: 'red' },
          ];

        //******** FORECAST DATA *********//
        let forecastData: { name: string, y: number, color: string }[] = [];
        let salaryBudget: number = this.forecast.salary

        forecastData = [
          { name: "Food", y: foodBudget, color: '#673AB7' },
          { name: "Transport", y: transportBudget, color: '#673AB7' },
          { name: "Sport", y: sportBudget, color: '#673AB7' },
          { name: "Invoice", y: invoiceBudget, color: '#673AB7' },
          { name: "Shopping", y: shoppingBudget, color: '#673AB7' },
          { name: "Leisure", y: leisureBudget, color: '#673AB7' },
          { name: "Real Estate", y: realEstateBudget, color: '#673AB7' },
        ]

        //******** BUDGET CHART OPTIONS *********//
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: `Salary: <span style="color: #673AB7;">$ ${salaryBudget}</span>`,
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
                const amount = rateToAmount(this.y, salaryBudget).toFixed(2);
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

