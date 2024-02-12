import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Account } from '../account';
import { Transaction } from '../../transaction/transaction';
import { AccountService } from '../account.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { amountByCategoryByAccount, totalAmount, amountByCategoryFusion } from '../../utils/expense.util';
import { ExpensesStorageService } from '../../shared-services/expensesStorage.service';
import { ForecastVisualComponent } from 'src/app/forecast/forecast-visual/forecast-visual.component';
import { BehaviorService } from 'src/app/behavior.service';
import { Observable, mapTo, tap } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
  imports: [RouterLink, ForecastVisualComponent],
  standalone: true
})

export class AccountListComponent implements OnInit {
  userId: number | null;
  dataLoading: boolean = false;

  accountsList: Account[] = [];
  transactionsList: Transaction[] = [];

  expensesByAccount: {[accountId: number]: number} = {};
  expensesByCategoryByAccount: {[accountId: number]: {[category: string]: number }} = {};
  globalExpensesByCategory: { [category: string]: number } = {};

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private storageService: ExpensesStorageService,
    private behaviorService: BehaviorService
  ) {}

  //********************* INITIALIZATION **********************/
  ngOnInit() {

    // BehaviorService => récupération User connecté ( dans observable$ )
    this.behaviorService.currentUser$.subscribe((u) => {
      console.log('User ID :', u);

      if (u) {
        this.userId = u;

        // AccountService => récupérer les comptes de l'utilisateur
        this.accountService.getAccountsByUser(this.userId).subscribe({

          next: (accounts) => {
            this.accountsList = accounts;

            // Créer un tableau pour stocker les observables des transactions
            const observablesArray: any[] = [];

            // Pour chaque compte, charger les transactions et les stocker dans le tableau d'observables
            this.accountsList.forEach(account => {
              const transactionsObservables = this.calculOnTransactionsLoading(account.id);
              observablesArray.push(transactionsObservables);
            });

            // ForkJoin attends que chaque loadTransactionsByAccount soit effectué
            forkJoin(observablesArray).subscribe(() => {

            this.globalExpensesByCategory = amountByCategoryFusion(this.expensesByCategoryByAccount);
            console.log("GLOBALE" + JSON.stringify(this.globalExpensesByCategory));

            // Enregistrer les dépenses par catégorie
            this.storageService.setExpensesByCategory(this.globalExpensesByCategory);
            const blabla = this.storageService.getExpensesByCategory();
            console.log("blabla",blabla)

            // Signaler que les données sont chargées
            this.behaviorService.dataState(true);
            });
          },
        })

      } else {
        console.log('No user connected.');
      }
    });
  }

  //************************* TRANSACTIONS LOADING *************************/
  calculOnTransactionsLoading(accountId: number): Observable<void> {
    return this.transactionService.getTransactionsByAccount(accountId).pipe(
      tap((transactions) => {
        // je calcul les dépenses de chaque category de ${ACCOUNT}
        this.expensesByCategoryByAccount[accountId] = amountByCategoryByAccount(transactions);

        // je calcul les dépenses de ${ACCOUNT}
        this.expensesByAccount[accountId] = totalAmount(transactions);

        // SharedService => je stock les calculs
        this.storageService.setExpensesByAccount(this.expensesByAccount);
        this.storageService.setExpensesByCategoryByAccount(this.expensesByCategoryByAccount);
      }),
      mapTo(undefined)
    );
  }

  //**************** ACCOUNT CLIC = (ACCOUNT ID => BEHAVIORSUBJECT) ****************/
  saveAccountId(accountId: number){
    // je stocke accountId dans le behaviorSubject
    this.behaviorService.accountId(accountId);
  }
}

