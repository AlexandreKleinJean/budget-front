import { Injectable } from '@angular/core';
import { Account } from './account';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;

  constructor(private authService: AuthService) {}

  /*----------Récupérer l'ID d'un account--------------*/
  setSelectedAccountId(accountId: number) {
    this.selectedAccountId = accountId;
  }

  /*------------------Créer un account-------------------*/
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

  /*----------Récupérer les accounts par user-------------*/
  async getAccountsByUser(userId: number): Promise<Account[]> {

    const loggedInUserId = this.authService.getLoggedInUserId();

    // l'id du user existe
    if (loggedInUserId) {

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

    // l'id du user n'existe pas
    } else {
      console.error('No user with this id');
      return [];
    }
  }

  /*----------Récupérer un account par son ID-------------*/

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

