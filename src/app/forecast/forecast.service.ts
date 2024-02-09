import { Injectable } from '@angular/core';
import { Forecast } from './forecast';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;
  jwtToken: string | null = null;

  constructor(private http: HttpClient) {}


  /*----------Récupérer un account par son ID-------------*/
  getForecastById(forecastId: number): Observable<Forecast> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');

    // l'id du user et le JWT existent
    if (this.jwtToken) {

      const headers = { 'Authorization': `${this.jwtToken}`, 'Content-Type': 'application/json' };

      const response = this.http.get<Forecast>(`${this.apiUrl}/forecast/${forecastId}`, { headers: headers }).pipe(
        catchError(error => {
          console.error('Error fetching forecast', error);
          return throwError(() => new Error('Error fetching forecast'));
        })
      );

      return response;

    // le JWT n'existe pas
    } else {
      console.error('Jwt not found');
      return throwError(() => new Error('Jwt not found'));
    }
  }

  /*------------------Créer un forecast-------------------*/
  newForecast(
    salary: number,
    foodRate: number,
    transportRate: number,
    sportRate: number,
    invoiceRate: number,
    shoppingRate: number,
    leisureRate: number,
    realEstateRate: number,
    userId: number
    ): Observable<Forecast | null> {

      const body = { salary, foodRate, transportRate, sportRate, invoiceRate, shoppingRate, leisureRate, realEstateRate, userId };
      const headers = { 'Content-Type': 'application/json' };

      const response = this.http.post<Forecast>(`${this.apiUrl}/${userId}/forecast`, body, { headers: headers }).pipe(
        catchError(error => {
          console.error('Error creating new account', error);
          return throwError(() => new Error('Error creating new account'));
        })
      );

      return response;
    }
}

