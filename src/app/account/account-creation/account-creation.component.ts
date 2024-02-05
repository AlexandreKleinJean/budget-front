import { Component } from '@angular/core';
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
export class AccountCreationComponent{
  account: Account | null;
  name: string = '';
  bank: string = '';
  userId: number | null;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  addNewAccount() {

    // je récupère le userId dans le localStorage
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log("(accountCreationComponent) => userId:" + loggedInUserId)

    if(loggedInUserId){
      this.userId =+ loggedInUserId;

      // AccountService => pour créer un account
      this.accountService.newAccount(
        this.name,
        this.bank,
        this.userId
      ).subscribe({

        next:(newAccount) => {
          this.account = newAccount;
          console.log('Account successfully created', newAccount);
          this.router.navigate(['/account/list']);
        },

        error: (error) => console.error('Error creating account:', error),
      })

    } else {
      console.error('UserId undefined');
    }
  }
}
