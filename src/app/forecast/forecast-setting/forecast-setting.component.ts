import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForecastService } from '../forecast.service';
import { Forecast } from '../forecast';
import { BehaviorService } from 'src/app/shared-services/behavior.service';

@Component({
  selector: 'app-forecast-setting',
  templateUrl: './forecast-setting.component.html',
  styleUrl: './forecast-setting.component.css',
  imports: [FormsModule, RouterLink],
  standalone: true
})
export class ForecastSettingComponent implements OnInit{
  userId: number | null;
  forecast: Forecast | null;

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
    private forecastService: ForecastService,
    private router: Router,
    private behaviorService: BehaviorService
    ) {}

  async ngOnInit() {
    // BehaviorService => récupération User connecté (dans observable$)
    this.behaviorService.currentUser$.subscribe({
      next: (u) => {

        if (u) {
          this.userId = u;
        }
      }
    })
  }

  //*************** FORECAST SETTING ****************/
  setForecast() {

      if(this.userId){

        // ForecastService => créer un forecast
        this.forecastService.newForecast(
          this.salary,
          this.foodRate,
          this.transportRate,
          this.sportRate,
          this.invoiceRate,
          this.shoppingRate,
          this.leisureRate,
          this.realEstateRate,
          this.userId
        ).subscribe({

          next: (fc) => {
            this.forecast = fc
            console.log('Forecast successfully created', this.forecast);
            this.router.navigate(['/account/list']);
          },

          error: (error) => console.error('Error creating transaction:', error),
      })

    } else {
      console.error('UserId undefined');
    }
  }


  //*************** DISPATCH TOTAL % ****************/
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

  //*************** DISPATCH NOTIFICATION ****************/
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

  //*************** DISABLE SUBMIT BUTTON ****************/
  submitButton(): boolean {
    return this.totalRate !== 100;
  }
}
