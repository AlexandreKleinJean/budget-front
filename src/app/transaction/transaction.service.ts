import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';
import { TRANSACTIONS } from './mock-transaction-list';*/
import { Transaction } from './transaction';

@Injectable()
export class TransactionService {
  private apiUrl = 'http://localhost:8080';

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
    icon: string,
    date: Date,
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
        body: JSON.stringify({ subject, note, icon, date, category, amount, accountId }),
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
      'Nourriture',
      'Transport',
      'Sport',
      'Factures',
      'Shopping',
      'Loisirs',
      'Real Estate'
    ];
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

