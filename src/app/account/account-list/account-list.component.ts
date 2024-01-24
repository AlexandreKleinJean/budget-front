import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  userId: number | null;

  accountsList: Account[] = [];
  showNotification = false;
  notificationMessage = '';

  constructor(
    private accountService: AccountService
  ) {}

  async ngOnInit() {

      if (this.userId) {

        try {
        // J'appelle AccountService pour récupérer les comptes du loggedInUser
        this.accountsList = await this.accountService.getAccountsByUser(+this.userId);

        } catch (error) {
          console.error('Error fetching accounts:', error);
        }

      } else {
        console.error('UserId undefined');
      }
  }

  /*-----------Method pour stocker accountId en localStorage--------------*/
  saveAccountId(account: Account){
    // je stocke le accountId dans le localStorage
    localStorage.setItem('selectedAccountId', account.id.toString());
  }
}

