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

  foodAmount: number = 0;
  transportAmount: number = 0;
  sportAmount: number = 0;
  invoiceAmount: number = 0;
  shoppingAmount: number = 0;
  leisureAmount: number = 0;
  realEstateAmount: number = 0;

  constructor(
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

  /*-------------Je convertis le rate en $---------------*/
  rateToDollar(category: string, salary: number, rate: number): void {
    switch (category) {
      case 'food':
        this.foodAmount = salary * (rate / 100);
        break;
      case 'transport':
        this.transportAmount = salary * (rate / 100);
        break;
      case 'sport':
        this.sportAmount = salary * (rate / 100);
        break;
      case 'invoice':
        this.invoiceAmount = salary * (rate / 100);
        break;
      case 'shopping':
        this.shoppingAmount = salary * (rate / 100);
        break;
      case 'leisure':
        this.leisureAmount = salary * (rate / 100);
        break;
      case 'realEstate':
        this.realEstateAmount = salary * (rate / 100);
        break;
      default:
        break;
    }
  }

  /*--------Bouton disable si le total n'est pas 100%--------*/
  submitButton(): boolean {
    return this.totalRate !== 100;
  }

  /*--------Je soumet ma prévision-----------*/
  setForecast() {
  }
}
