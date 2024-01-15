import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
        // j'assigne loggedInUserId à this.userId => accessible aux autres methods
        this.userId = Number(loggedInUserId);
      } else {
        console.error('UserId undefined');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  /*-----------Bouton pour supprimer l'account--------------*/
  /*async deleteAccount(account: Account) {
    if (account) {
      try {
        await this.accountService.deleteOneAccountById(account.id)
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }*/
}

