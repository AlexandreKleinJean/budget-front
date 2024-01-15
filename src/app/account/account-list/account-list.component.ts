import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
  imports: [RouterLink],
  standalone: true
})

export class AccountListComponent implements OnInit {
  accountsList: Account[] = [];
  userId: number | null;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    try {
      // je récupère le userId dans le localStorage
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      console.log('(AccountComponent) userID:', loggedInUserId);

      if (loggedInUserId) {
        // J'appelle AccountService pour récupérer les comptes du loggedInUser
        this.accountsList = await this.accountService.getAccountsByUser(Number(loggedInUserId));
      } else {
        console.error('UserId undefined');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  /*---------Bouton pour aller sur la liste de transactions-------*/

  goToTransactions(account: Account) {
    console.log(account)
    if (account) {
      // je stocke l'ID du user connecté dans le localStorage
      localStorage.setItem('selectedAccountId', account.id.toString());
    }
  }

  /*-----------Bouton pour supprimer l'account--------------*/
  async deleteAccount(account: Account) {
    if (account && this.userId) {
      try {
        // Je récupère l'id de l'account
        this.accountService.setSelectedAccountId(account.id);
        // Je supprime l'account concerné
        await this.accountService.deleteOneAccountById(account.id);
        // Je recharge la liste des accounts à jour
        this.accountsList = await this.accountService.getAccountsByUser(this.userId);
        // Je recharge la page actuelle
        this.router.navigate(['/accounts']);

      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }

  /*------Bouton pour aller sur le form de creation d'account------*/
  goToAccountCreationForm() {
    if (this.userId) {
      console.log(this.userId);
      this.router.navigate([`/${this.userId}/account`]);
    } else {
      console.error('UserId is undefined');
    }
  }

}

