import { Injectable } from '@angular/core';
import { User } from '../user/user';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private loggedInUserId: number | null = null;

  constructor() { }

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
        // Je stocke la réponse du server dans "user"
        const user = await response.json();
        // Extraire le JWT de l'en-tête "Authorization"
        const jwtToken = response.headers.get('Authorization');
        // Je stocke le JWT dans le local storage
        if (jwtToken) {localStorage.setItem('jwtToken', jwtToken);}
        // Je stocke l'ID du user connecté
        this.loggedInUserId = user.id;
        // Je retourne le user connecté
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

  /*--------------Récupération de l'id du loggedInUser-----------*/
  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }

  /*--------------Vérification si le user est connecté-----------*/
  isAuthenticated(): boolean {
    // je vais chercher le Jwt dans lelocal storage
    const jwtToken = localStorage.getItem('jwtToken');
    // je renvoie true si le JWT est présent
    return !!jwtToken;
  }

  /*------------------------Inscription---------------------*/
  async register(
    gender: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string)
    : Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender, firstname, lastname, email, password }),
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

