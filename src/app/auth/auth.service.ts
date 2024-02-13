import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ExpensesStorageService } from '../shared-services/expensesStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  jwtToken: string | null = null;

  constructor(
    private storageService: ExpensesStorageService,
    private http: HttpClient
    ) {}

  //*************************** Login **************************/
  login(email: string, password: string): Observable<User | null> {

    const body = { email, password };
    const headers = { 'Content-Type': 'application/json' };

    // observe: 'response' => on veut la réponse http COMPLETE (normalement on a que le body)
    const response = this.http.post<User>(`${this.apiUrl}/login`, body, { headers, observe: 'response' }).pipe(

      // Tap => logique métier sans modifier le flux
      tap((fullResponse: HttpResponse<User>) => {
        // je récupère le jwt dans le header de la fullResponse
        this.jwtToken = fullResponse.headers.get('Authorization');

        if (this.jwtToken) {
          // je stock le jwt dans le localStorage
          localStorage.setItem('jwtToken', this.jwtToken);
        }
      }),

      // Map => modification flux (fullResponse en response classique = que le body)
      map(fullResponse => fullResponse.body),

      // CatchError => si une erreur dans le flux est présente, je l'intercepte
      catchError(e => {
        console.error('Error during login', e);
        // ThrowError => je retourne une observable avec le body de la reponse d'erreur
        return throwError(e.error);
      })
    );
    // je retourne l'observable attendu
    return response;
  }

  //************************* Register *************************/
  register(gender: string, firstname: string, lastname: string, email: string, password: string)
    : Observable<User | null> {

      const forecastId = 1;
      const body = { gender, firstname, lastname, email, password, forecastId };
      const headers = { 'Content-Type': 'application/json' };

      const response = this.http.post<User>(`${this.apiUrl}/register`, body, {headers: headers }).pipe(
        catchError(error => {
            console.error('Error creating new account', error);
            return throwError(() => new Error('Error creating new account'));
        })
      );

      return response;
    }

  /*-----------------------Déconnection---------------------*/
  logout() {
    // j'efface le jwt du localStorage
    localStorage.removeItem('jwtToken');
    // je reset mes données de storageService
    this.storageService.resetData()
  }
}

