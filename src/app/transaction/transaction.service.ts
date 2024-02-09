import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080';
  jwtToken: string | null = null;

  constructor(private http: HttpClient) { }

  /*-----------Récupérer les transactions par account------------*/
  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {

    const response = this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}/transactions`).pipe(
      catchError(error => {
        console.error('Error fetching transactions', error);
        return throwError(() => new Error('Error fetching transactions'));
      })
    );

    return response;
  }

  /*--------------Récupérer une transaction par son id---------------*/
  getOneTransactionById(transactionId: number): Observable<Transaction> {

      const response = this.http.get<Transaction>(`${this.apiUrl}/transactions/${transactionId}`).pipe(
        catchError(error => {
          console.error('Error fetching transactions', error);
          return throwError(() => new Error('Error fetching transaction'));
        })
      );

      return response;
  }

  /*------------------Créer une transaction-------------------*/
  newTransaction(
    subject: string,
    note: string,
    category: string,
    amount: number,
    accountId: number
    ): Observable<Transaction | null> {

      const body = { subject, note, category, amount, accountId };
      const headers = { 'Content-Type': 'application/json' };

      const response = this.http.post<Transaction>(`${this.apiUrl}/transaction`, body, { headers: headers }).pipe(
        catchError(error => {
          console.error('Error creating new transaction', error);
          return throwError(() => new Error('Error creating new transaction'));
        })
      );

      return response;
  }

  /*-------------Supprimer une transaction----------------*/
  deleteOneTransactionById(transactionId: number): Observable<Object> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');

    // le JWT existe
    if (this.jwtToken) {

      const headers = { 'Authorization': `${this.jwtToken}`, 'Content-Type': 'application/json' };

      const response = this.http.delete(`${this.apiUrl}/transaction/${transactionId}`, { headers }).pipe(
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
}

