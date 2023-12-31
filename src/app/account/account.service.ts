import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';
import { TRANSACTIONS } from './mock-transaction-list';*/
import { Account } from './account';

@Injectable()
export class AccountService {
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  async getAccountsByUser(userId: number): Promise<Account[]> {
    try {
      const response = await fetch(`${this.apiUrl}/${userId}/accounts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }

  async getAccountList(): Promise<Account[]> {
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
  }

  async getOneAccountById(accountId: number): Promise<Account> {
    try {
      const response = await fetch(`${this.apiUrl}/accounts/${accountId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }
}

  /*getTransationList(): Transaction[] {
    return TRANSACTIONS;
  }

  getTransactionById(transactionID: number): Transaction|undefined {
    return TRANSACTIONS.find(transaction => transaction.id == transactionID)
  }

  }*/

