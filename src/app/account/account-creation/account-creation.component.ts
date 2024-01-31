import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
  imports: [FormsModule],
  standalone: true
})
export class AccountCreationComponent implements OnInit{
  userId: number | null;
  account: Account;
  name: string = '';
  bank: string = '';

    constructor(
      private accountService: AccountService,
      private router: Router
    ) {}

    async ngOnInit() {
    }

    async addNewAccount() {
      try{
        // je récupère le userId dans le localStorage
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        console.log("(accountCreationComponent) => userId:" + loggedInUserId)

        if(loggedInUserId){

          this.userId =+ loggedInUserId;
          // J'appelle la method de accountService pour créer un account
          const newAccount = await this.accountService.newAccount(
            this.name,
            this.bank,
            this.userId
          );

          if (newAccount) {
            console.log('Account successfully created', newAccount);
            // je redirige vers la page dashboard
            this.router.navigate(['/dashboard']);

            } else {
              console.error('Account creation error');
            }
        } else {
            console.error('UserId is not found');
        }

      } catch (error) {
        console.error('Error on account creation:', error);
      }
    }
}
