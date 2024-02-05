import { Component, Input, OnInit } from '@angular/core';
import{ RouterLink, Router } from '@angular/router';
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
    private accountService: AccountService,
    private router: Router
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {

    /*-----------Récupération de l'id du account sélectionné----------*/
    const selectedAccountId = localStorage.getItem('selectedAccountId');
    console.log('(Account-detail) accountID:', selectedAccountId);

    if(selectedAccountId){
      this.accountId= +selectedAccountId

      /*-----------Récupération du compte sélectionné----------*/
      this.accountService.getOneAccountById(+this.accountId).subscribe({

        next: (acc) => {
          this.account = acc;
        },

        error: (error) => console.error('Error fetching account::', error),

        complete: () => console.log('Account fetch completed')
      });

    } else {
      console.error('AccountId undefined');
    }
  }

  //********************* DELETE ACCOUNT **********************/
  deleteAccount() {

    if (this.accountId) {

        this.accountService.deleteOneAccountById(+this.accountId).subscribe({
          next: () => {
            this.accountId = null;
            this.router.navigate(['/account/list']);
          },
          error: (error) => {
            console.error('Error deleting account:', error);
          }
        });

    } else {
      console.log("id introuvable");
    }
  }

  //********************* TOTAL $ EXPENSES **********************/
  handleTotalExpenses(total: number) {
    this.totalExpenses = total;
    console.log('(AccountDetail) total expenses:', this.totalExpenses);
  }

}

