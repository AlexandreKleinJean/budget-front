import { Component, OnInit } from '@angular/core';
import{ RouterLink } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  imports: [RouterLink],
  standalone: true
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;

  constructor(
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    // je récupère le accountId dans le localStorage
    const selectedAccountId = localStorage.getItem('selectedAccountId');

    if (selectedAccountId) {
      try {
        this.account = await this.accountService.getOneAccountById(+selectedAccountId);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    }
  }
}

