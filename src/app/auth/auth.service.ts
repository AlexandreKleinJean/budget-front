import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { SharedService } from '../shared-services/expenses.shared-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private loggedInUserId: number | null = null;

  constructor(private sharedService: SharedService) {}

  /*------------------------Inscription---------------------*/
  async register(
    gender: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string)
    : Promise<User | null> {
    try {
      const forecastId = 1;

      const response = await fetch(`${this.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender, firstname, lastname, email, password, forecastId }),
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

  /*-----------------------Connection---------------------*/
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
        // je stocke la réponse du server dans "user"
        const user = await response.json();
        // j'extraie le JWT de l'en-tête "Authorization"
        const jwtToken = response.headers.get('Authorization');
        // je stocke le JWT dans le local storage
        if (jwtToken) {localStorage.setItem('jwtToken', jwtToken);}
        // je stocke l'ID du user connecté dans le localStorage
        localStorage.setItem('loggedInUserId', user.id.toString());
        // je retourne le user connecté
        return user;

      } else {
        console.error('No response from the fetch');
        return null;
      }
    } catch (error) {
      console.error('Problem with your fetch operation:', error);
      throw error;
    }
  }

  /*-----------------------Déconnection---------------------*/
  logout() {
    // j'efface le jwt du localStorage
    localStorage.removeItem('jwtToken');
    // j'efface le userId du localStorage
    localStorage.removeItem('loggedInUserId');
    // ma variable loggedInUserId est null
    this.loggedInUserId = null;
    // je reset mes données de sharedService
    this.sharedService.resetData()
  }

  /*--------------Récupération de l'id du loggedInUser-----------*/
  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }
}

