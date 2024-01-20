import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(
    ) {}

    async ngOnInit() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log("(forecastCreationComponent) => userId:" + loggedInUserId)

      if(loggedInUserId){
        this.userId =+ loggedInUserId;
    }
  }

  /*--------Je calcul le pourcentage total-----------*/
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

  /*--------Je soumet ma prévision-----------*/
  setForecast() {
    if(this.totalRate !== 100){
      console.log("The forecast is not complete")
    } else {
      console.log("Forecast complete and submitted")
    }
  }
}
