import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /*----------Stocker l'id d'un user-------------*/
  loggedInUserId: number | null = null;

  setLoggedInUserId(userId: number) {
    this.loggedInUserId = userId;
  }

  /*----------Récupérer tous les users-------------*/
  getUserList(): Observable<User[]> {

    const response = this.http.get<User[]>(`${this.apiUrl}/clients`).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(() => new Error('Error fetching users'));
      })
    );

    return response;
  }

  /*----------Récupérer un user par son id-------------*/
  getOneUserById(userId: number): Observable<User> {

    const response = this.http.get<User>(`${this.apiUrl}/client/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching user', error);
        return throwError(() => new Error('Error fetching user'));
      })
    );

    return response;
  }

}

