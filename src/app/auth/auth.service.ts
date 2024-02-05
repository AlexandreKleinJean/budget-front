import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { SharedService } from '../shared-services/expenses.shared-service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private loggedInUserId: number | null = null;
  jwtToken: string | null = null;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient) {}

  /*------------------------Inscription---------------------*/
  register(
    gender: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string)
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

  /*-----------------------Connection---------------------*/
  login(email: string, password: string): Observable<User | null> {
    const body = { email, password };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<User>(`${this.apiUrl}/login`, body, { headers, observe: 'response' }).pipe(
      tap((fullResponse: HttpResponse<User>) => {
        this.jwtToken = fullResponse.headers.get('Authorization');
        if (this.jwtToken) {
          localStorage.setItem('jwtToken', this.jwtToken);
          // Assurez-vous que votre API renvoie l'objet utilisateur avec un champ `id`
          if (fullResponse.body?.id) {
            localStorage.setItem('loggedInUserId', fullResponse.body.id.toString());
          }
        }
      }),
      map(fullResponse => fullResponse.body), // Transforme HttpResponse<User> en User
      catchError(error => {
        console.error('Error during login', error);
        return throwError(() => new Error('Error during login'));
      })
    );
  }

//****************************************** A TRAVAILLER *****************************************/

  /*-----------------------Déconnection---------------------*/
  logout() {
    // j'efface le jwt du localStorage
    localStorage.removeItem('jwtToken');
    // j'efface le userId du localStorage
    localStorage.removeItem('loggedInUserId');
    // ma variable loggedInUserId est null
    this.loggedInUserId = null;
    // je reset mes données de sharedService
    this.sharedService.resetData()
  }

  /*--------------Récupération de l'id du loggedInUser-----------*/
  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }
}

