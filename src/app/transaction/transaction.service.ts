import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';
import { TRANSACTIONS } from './mock-transaction-list';*/
import { Transaction } from './transaction';

@Injectable()
export class TransactionService {
  private apiUrl = 'http://localhost:8080';
  jwtToken: string | null = null;

  constructor() { }

  /*-----------Récupérer les transactions par le compte------------*/
  async getTransactionsByAccount(accountId: number): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.apiUrl}/${accountId}/transactions`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }

  /*--------------Récupérer une transaction par son id---------------*/
  async getOneTransactionById(transactionId: number): Promise<Transaction> {
    try {
      const response = await fetch(`${this.apiUrl}/transactions/${transactionId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }

  /*------------------Créer une transaction-------------------*/
  async newTransaction(
    subject: string,
    note: string,
    category: string,
    amount: number,
    accountId: number
    ): Promise<Transaction | null> {

    try {
      const response = await fetch(`${this.apiUrl}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, note, category, amount, accountId }),
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

  getTransactionCategoriesList(): string[] {
    return [
      'Food',
      'Transport',
      'Sport',
      'Invoice', 'Shopping',
      'Leisure',
      'Real Estate'
    ];
  }

  /*-------------Supprimer une transaction----------------*/
  async deleteOneTransactionById(transactionId: number): Promise<void> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {
      try {
        const response = await fetch(`${this.apiUrl}/transaction/${transactionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${this.jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

      } catch (error) {
        console.error('Problem with your fetch operation:', error);
        throw error;
      }
    // le JWT n'existe pas
    } else {
      console.error('Jwt not found');
    }
  }

  /*async getTransactionList(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.apiUrl}/transactions`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }

  }*/
}

