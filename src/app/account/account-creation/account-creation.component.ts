import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  imports: [CommonModule],
  standalone: true
})
export class AccountCreationComponent implements OnInit{
  account: Account;

    constructor(
      private router: Router,
      private accountService: AccountService,
      private authService: AuthService
    ) {}

    async ngOnInit() {
        // J'appelle AuthService pour récupéré l'ID du user connecté
        const userId = this.authService.getLoggedInUserId();

    }
  }

  /*
  async createAccount(name: string, bank: string, userId: number) {
    try {
      const newAccount = await this.accountService.newAccount(name, bank, userId);
      if (newAccount) {
        // Gérer le cas où la création du compte a réussi
        console.log('Nouveau compte créé avec succès:', newAccount);
        // Vous pouvez également mettre à jour la liste des comptes ou effectuer d'autres opérations nécessaires ici.
      } else {
        // Gérer le cas où la création du compte a échoué
        console.error('La création du compte a échoué.');
      }
    } catch (error) {
      // Gérer les erreurs de requête ici
      console.error('Erreur lors de la création du compte:', error);
    }
  }*/
