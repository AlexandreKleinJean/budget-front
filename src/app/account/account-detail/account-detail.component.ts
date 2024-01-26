import { Component, Input, OnInit } from '@angular/core';
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
  @Input() userId: Number | null;
  accountId: Number | null;
  account: Account | undefined;

  totalExpenses: number;

  constructor(
    private accountService: AccountService
  ) {}

  async ngOnInit() {

    /*-----------Récupération de l'id du account sélectionné----------*/
    const selectedAccountId = localStorage.getItem('selectedAccountId');
    console.log('(DashBoard-detail) accountID:', selectedAccountId);
    if(selectedAccountId){
      this.accountId= +selectedAccountId
    }

    if(this.accountId){

      try {
        this.account = await this.accountService.getOneAccountById(+this.accountId);

      } catch (error) {
        console.error('Error fetching account:', error);
      }

    } else {
      console.error('AccountId undefined');
    }
  }

  handleTotalExpenses(total: number) {
    this.totalExpenses = total;
    console.log('(AccountDetail) total expenses:', this.totalExpenses);
  }

  /*-----------Bouton pour supprimer l'account--------------*/
   async deleteAccount() {
    if (this.accountId) {
      try {
        await this.accountService.deleteOneAccountById(+this.accountId)
        this.accountId = null;
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    } else {
      console.log("id introuvable")
    }
  }
}

