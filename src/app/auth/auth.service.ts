import { Injectable } from '@angular/core';
import { User } from '../user/user';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
}

  /*getTransationList(): Transaction[] {
    return TRANSACTIONS;
  }

  getTransactionById(transactionID: number): Transaction|undefined {
    return TRANSACTIONS.find(transaction => transaction.id == transactionID)
  }

  }*/

