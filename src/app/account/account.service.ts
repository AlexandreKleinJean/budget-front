import { Injectable } from '@angular/core';
import { Account } from './account';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;
  jwtToken: string | null = null;

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

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // l'id du user et le JWT existent
    if (this.jwtToken) {

      try {
        // appel API en fournissant le JWT au serveur
        const response = await fetch(`${this.apiUrl}/${userId}/accounts`, {
          headers: {
            'Authorization': `${this.jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();

      } catch (error) {
        console.error('Accounts fetch failed:', error);
        throw error;
      }

    // l'id du user ou le JWT n'existe pas
    } else {
      console.error('UserId or Jwt not found');
      return [];
    }
  }

  /*----------Récupérer un account par son ID-------------*/
  async getOneAccountById(accountId: number): Promise<Account|undefined> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {

      try {
        // appel API en fournissant le JWT au serveur
        const response = await fetch(`${this.apiUrl}/accounts/${accountId}`, {
            headers: {
              'Authorization': `${this.jwtToken}`,
              'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();

      } catch (error) {
        console.error('One account fetch failed:', error);
        throw error;
      }
    // le JWT n'existe pas
    } else {
      console.error('Jwt not found');
      return undefined;
    }
  }

  /*-------------Supprimer un account----------------*/
  async deleteOneAccountById(accountId: number): Promise<void> {

    // je récupère le JWT contenu dans le Local Storage
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)

    // le JWT existe
    if (this.jwtToken) {
      try {
        const response = await fetch(`${this.apiUrl}/account/${accountId}`, {
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

