import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  imports: [CommonModule],
  standalone: true
})

export class AccountListComponent implements OnInit {
  accountsList: Account[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    try {
      // J'appelle UserService pour récupéré l'ID du loggedInUser
      const userId = this.userService.loggedInUserId;

      if (userId) {
        // J'appelle AccountService pour récupérer les comptes du loggedInUser
        this.accountsList = await this.accountService.getAccountsByUser(userId);
      } else {
        console.error('No user with this id');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }

  goToTransactions(accountId: number) {
    // Je définit l'id du account séléctionné
    this.accountService.setSelectedAccountId(accountId);
    this.router.navigate([`/${accountId}/transactions`]);
  }
}

