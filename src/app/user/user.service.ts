import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  /*----------Stocker l'id d'un user-------------*/
  loggedInUserId: number | null = null;

  setLoggedInUserId(userId: number) {
    this.loggedInUserId = userId;
  }

  /*----------Récupérer tous les users-------------*/
  async getUserList(): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}/clients`);
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

  /*----------Récupérer un user par son id-------------*/
  async getOneUserById(userId: number): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/client/${userId}`);
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

