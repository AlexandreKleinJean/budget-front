import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast-setting',
  templateUrl: './forecast-setting.component.html',
  styleUrl: './forecast-setting.component.css',
  imports: [FormsModule, RouterLink],
  standalone: true
})
export class ForecastSettingComponent implements OnInit{
  userId: number | null;

  salary: number = 0;
  foodRate: number = 0;
  transportRate: number = 0;
  sportRate: number = 0;
  invoiceRate: number = 0;
  shoppingRate: number = 0;
  leisureRate: number = 0;
  realEstateRate: number = 0;
  totalRate: number = 0;

  foodAmount: number = 0;
  transportAmount: number = 0;
  sportAmount: number = 0;
  invoiceAmount: number = 0;
  shoppingAmount: number = 0;
  leisureAmount: number = 0;
  realEstateAmount: number = 0;

  constructor(private forecastService: ForecastService
    ) {}

    async ngOnInit() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(forecastCreationComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){
        this.userId =+ loggedInUserId;
    }
  }

  /*------------Je calcul le pourcentage total--------------*/
  updateTotal() {
    this.totalRate =
      this.foodRate +
      this.transportRate +
      this.sportRate +
      this.invoiceRate +
      this.shoppingRate +
      this.leisureRate +
      this.realEstateRate;
  }

  /*--------Je définit ma notification selon la situation-------*/
  notificationCustom(): { style: string, text: string } {
    if (this.totalRate < 100) {
        return {
          style: "background-color:rgba(197, 194, 203, 0.5)",
          text: `Salary to dispatch : ${100 - this.totalRate} %`
        }
    } else if(this.totalRate === 100) {
        return {
        style: "background-color: rgba(0, 150, 0, 0.5)",
        text: `Forecast complete`
        }
    } else {
      return {
        style: "background-color: rgba(255, 0, 0, 0.5)",
        text: 'Reduce your dispatch'
        }
    };
  }

  /*--------Bouton disable si le total n'est pas 100%--------*/
  submitButton(): boolean {
    return this.totalRate !== 100;
  }

  /*--------Je soumet ma prévision-----------*/
  async setForecast() {
    try{
      // je récupère le userId dans le localStorage
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(accountCreationComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){

        this.userId =+ loggedInUserId;
        // J'appelle la method de forecastService pour créer un forecast
        const newForecast = await this.forecastService.newForecast(
          this.salary,
          this.foodRate,
          this.transportRate,
          this.sportRate,
          this.invoiceRate,
          this.shoppingRate,
          this.leisureRate,
          this.realEstateRate,
          this.userId
        );

        if (newForecast) {
          console.log('Forecast successfully created', newForecast);

          } else {
            console.error('Forecast creation error');
          }
      } else {
          console.error('UserId is not found');
      }

    } catch (error) {
      console.error('Error on account creation:', error);
    }
  }
}
