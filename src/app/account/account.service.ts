import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;
  jwtToken: string | null = null;

  constructor(
    private http: HttpClient
    ) {}

  /*----------Récupérer l'ID d'un account--------------*/
  setSelectedAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  /*----------Récupérer les accounts par user-------------*/
  getAccountsByUser(userId: number): Observable<Account[]> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // l'id du user et le JWT existent
    if (this.jwtToken) {

      const headers = { 'Authorization': `${this.jwtToken}`, 'Content-Type': 'application/json' };

      const response = this.http.get<Account[]>(`${this.apiUrl}/${userId}/accounts`, { headers: headers }).pipe(
        catchError(error => {
          console.error('Error fetching accounts', error);
          return throwError(() => new Error('Error fetching accounts'));
        })
      );

      return response;

    // le JWT n'existe pas
    } else {
      console.error('Jwt not found');
      return throwError(() => new Error('Jwt not found'));
    }
  }

  /*----------Récupérer un account par son ID-------------*/
  getOneAccountById(accountId: number): Observable<Account> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {

      const headers = { 'Authorization': `${this.jwtToken}`, 'Content-Type': 'application/json' };

      const response = this.http.get<Account>(`${this.apiUrl}/accounts/${accountId}`, { headers: headers }).pipe(
        catchError(error => {
          console.error('Error fetching account', error);
          return throwError(() => new Error('Error fetching account'));
        })
      );

      return response;

    // le JWT n'existe pas
    } else {
      console.error('Jwt not found');
      return throwError(() => new Error('Jwt not found'));
    }
  }

  /*------------------Créer un account-------------------*/
  newAccount(name: string, bank: string, clientId: number): Observable<Account | null> {

    const body = { name, bank, clientId };
    const headers = { 'Content-Type': 'application/json' };

    const response = this.http.post<Account>(`${this.apiUrl}/account`, body, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error creating new account', error);
        return throwError(() => new Error('Error creating new account'));
      })
    );

    return response;
  }

  /*-------------Supprimer un account----------------*/
  deleteOneAccountById(accountId: number): Observable<Object> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {

      const headers = { 'Authorization': `${this.jwtToken}`, 'Content-Type': 'application/json' };

      const response = this.http.delete(`${this.apiUrl}/account/${accountId}`, { headers }).pipe(
        catchError(error => {
          console.error('Problem with your delete operation:', error);
          return throwError(() => new Error('Error during the delete operation'));
        })
      );

      return response;

    // le JWT n'existe pas
    } else {

      console.error('Jwt not found');
      return throwError(() => new Error('Jwt not found'));
    }
  }

  /*----------Récupérer tous les accounts-------------*/
  /*async getAccountList(): Promise<Account[]> {
    try {
      const response = await fetch(`${this.apiUrl}/accounts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }*/
}

