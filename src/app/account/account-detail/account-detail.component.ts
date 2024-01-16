import { Component, OnInit } from '@angular/core';
import{ RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { TransactionListComponent } from 'src/app/transaction/transaction-list/transaction-list.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css',
  imports: [RouterLink, TransactionListComponent],
  standalone: true
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;
  accountId: Number | null;

  constructor(
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    // je récupère le accountId dans le localStorage
    const selectedAccountId = localStorage.getItem('selectedAccountId');
    if(selectedAccountId){
      this.accountId= +selectedAccountId
      try {
        this.account = await this.accountService.getOneAccountById(+selectedAccountId);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    }
  }
  /*-----------Bouton pour supprimer l'account--------------*/
   async deleteAccount() {
    if (this.accountId) {
      try {
        await this.accountService.deleteOneAccountById(+this.accountId)
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    } else {
      console.log("id introuvable")
    }
  }
}

