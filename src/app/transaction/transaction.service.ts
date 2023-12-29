import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';
import { TRANSACTIONS } from './mock-transaction-list';*/
import { Transaction } from './transaction';

@Injectable()
export class TransactionService {
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  async getTransactionList(): Promise<Transaction[]> {
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
}

  /*getTransationList(): Transaction[] {
    return TRANSACTIONS;
  }

  getTransactionById(transactionID: number): Transaction|undefined {
    return TRANSACTIONS.find(transaction => transaction.id == transactionID)
  }

  }*/

