import { Injectable } from '@angular/core';
import { Forecast } from './forecast';

@Injectable()
export class ForecastService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;
  jwtToken: string | null = null;

  constructor() {}


  /*----------Récupérer un account par son ID-------------*/
  async getForecastById(forecastId: number): Promise<Forecast|undefined> {

    /*// je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {*/

      try {
        // appel API en fournissant le JWT au serveur
        const response = await fetch(`${this.apiUrl}/forecast/${forecastId}`, {
            headers: {
              'Authorization': `${this.jwtToken}`,
              'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();

      } catch (error) {
        console.error('Forecast fetch failed:', error);
        throw error;
      }
    /*// le JWT n'existe pas
    } else {
      console.error('Jwt not found');
      return undefined;
    }*/
  }

  /*------------------Créer un forecast-------------------*/
  async newForecast(
    salary: number,
    foodRate: number,
    transportRate: number,
    sportRate: number,
    invoiceRate: number,
    shoppingRate: number,
    leisureRate: number,
    realEstateRate: number,
    userId: number

    ): Promise<Forecast | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${userId}/forecast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salary,
          foodRate,
          transportRate,
          sportRate,
          invoiceRate,
          shoppingRate,
          leisureRate,
          realEstateRate
        }),
      });

      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }
}

