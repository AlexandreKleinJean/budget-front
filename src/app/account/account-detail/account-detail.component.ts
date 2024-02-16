import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { TransactionListComponent } from '../../transaction/transaction-list/transaction-list.component';
import { BehaviorService } from '../../shared-services/behavior.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css',
  imports: [RouterLink, TransactionListComponent],
  standalone: true
})
export class AccountDetailComponent implements OnInit {
  @Input() userId: number | null;
  accountId: number | null;
  account: Account | undefined;
  totalExpenses: number;

  constructor(
    private accountService: AccountService,
    private behaviorService: BehaviorService,
    private router: Router
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {

      // BehaviorService => récupération Account sélectionné ( dans observable$ )
      this.behaviorService.currentAccount$.subscribe((accountId) => {
      console.log('Account ID :', accountId);

      if(accountId){
        this.accountId = accountId

        /*-----------Récupération du compte sélectionné----------*/
        this.accountService.getOneAccountById(this.accountId).subscribe({

          next: (acc) => {
            this.account = acc;
          },

          error: (error) => console.error('Error fetching account:', error)
        })

      } else {
        console.error('AccountId undefined');
      }
    });
  }

  //*********** TOTAL $ EXPENSES RECEIVED FROM CHILD **************/
  handleTotalExpenses(totalReceivedFromChild: number) {
    this.totalExpenses = totalReceivedFromChild;
  }

  //****************** DELETE ACCOUNT BUTTON **********************/
  deleteAccount() {

    if (this.accountId) {

        this.accountService.deleteOneAccountById(this.accountId).subscribe({
          next: () => {
            this.behaviorService.accountId(null);
            this.behaviorService.notifState({type: 'success', message: 'Account deleted'});
            this.router.navigate(['/account/list']);
          },
          error: (error) => {
            console.error('Error:', error),
            this.behaviorService.notifState({ type: 'error', message: error });
          }
        });

    } else {
      console.log("id introuvable");
    }
  }
}

