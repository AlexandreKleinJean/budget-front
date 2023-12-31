import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import{ ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  imports: [CommonModule],
  standalone: true
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    const accountId: string | null = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      try {
        this.account = await this.accountService.getOneAccountById(+accountId);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    }
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  goToEditAccountForm(account: Account) {
    this.router.navigate(['/edit/account', account.id]);
  }
}

