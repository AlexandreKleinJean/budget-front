import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  imports: [FormsModule],
  standalone: true
})
export class AccountCreationComponent implements OnInit{
  userId: number | null;
  account: Account;
  name: string = '';
  bank: string = '';

    constructor(
      private router: Router,
      private accountService: AccountService,
      private authService: AuthService
    ) {}

    async ngOnInit() {
      try {
        // J'appelle AuthService pour récupérer l'ID du user connecté
        this.userId = this.authService.getLoggedInUserId();
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }

    async onAccountSubmit() {

      try{
        // L'id du user est récupéré
        if(this.userId){

          // J'appelle la method de accountService pour créer un account
          const newAccount = await this.accountService.newAccount(
            this.name,
            this.bank,
            this.userId
          );

          if (newAccount) {
            console.log('Account successfully created', newAccount);

            // Redirection vers la page des comptes
            this.router.navigate(['/accounts']);

            } else {
              console.error('Account creation error');
            }
        } else {
            // L'id du user n'est pas récupéré
            console.error('UserId is not found');
        }

      } catch (error) {
        console.error('Error on account creation:', error);
      }
    }
}
