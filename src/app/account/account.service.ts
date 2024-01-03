import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()
export class AccountService {
  private apiUrl = 'http://localhost:8080';

  constructor() { }

  /*----------Stocker l'id du account-------------*/
  selectedAccountId: number | null = null;

  setSelectedAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  /*----------Récupérer les accounts par user-------------*/
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

  /*----------Récupérer tous les accounts-------------*/
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

  /*----------Récupérer un account par son id-------------*/
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

  /*----------Créer un account par son id-------------*/
  async newAccount(name: string, bank: string, clientId: number): Promise<Account | null> {
    try {
      const response = await fetch(`${this.apiUrl}/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, bank, clientId }),
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

