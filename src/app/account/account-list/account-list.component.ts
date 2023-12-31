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
      const loggedInUserId = this.userService.loggedInUserId;

      if (loggedInUserId) {
        // J'appelle AccountService pour récupérer les comptes du loggedInUser
        this.accountsList = await this.accountService.getAccountsByUser(loggedInUserId);
      } else {
        console.error('No user with this id');
      }
    } catch (error) {
      console.error('PROBLEME:', error);
    }
  }
}

