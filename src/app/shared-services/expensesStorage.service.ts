import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesStorageService {

  private totalExpensesByAccount: { [accountId: number]: number } = {};
  private categoryExpensesByAccount: {[accountId: number]: { [category: string]: number }} = {};

  setTotalExpensesByAccount(data: { [accountId: number]: number }) {
    this.totalExpensesByAccount = data;
  }

  getTotalExpensesByAccount(): { [accountId: number]: number } {
    return this.totalExpensesByAccount;
  }

  setCategoryExpensesByAccount(data: { [accountId: number]: { [category: string]: number } }) {
    this.categoryExpensesByAccount = data;
  }

  getCategoryExpensesByAccount(): { [accountId: number]: { [category: string]: number } } {
    return this.categoryExpensesByAccount;
  }

  resetData() {
    this.totalExpensesByAccount = {};
    this.categoryExpensesByAccount = {};
  }
}
