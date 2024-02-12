import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesStorageService {

  private expensesByAccount: { [accountId: number]: number } = {};
  private expensesByCategoryByAccount: {[accountId: number]: { [category: string]: number }} = {};
  private expensesByCategory: { [category: string]: number } = {};

  setExpensesByAccount(data: { [accountId: number]: number }) {
    this.expensesByAccount = data;
  }

  getExpensesByAccount(): { [accountId: number]: number } {
    return this.expensesByAccount;
  }

  setExpensesByCategoryByAccount(data: { [accountId: number]: { [category: string]: number } }) {
    this.expensesByCategoryByAccount = data;
  }

  getExpensesByCategoryByAccount(): { [accountId: number]: { [category: string]: number } } {
    return this.expensesByCategoryByAccount;
  }

  setExpensesByCategory(data: { [accountId: number]: number }) {
    this.expensesByAccount = data;
  }

  getExpensesByCategory(): { [category: string]: number } {
    return this.expensesByCategory;
  }

  resetData() {
    this.expensesByAccount = {};
    this.expensesByCategoryByAccount = {};
    this.expensesByCategory = {};
  }
}
