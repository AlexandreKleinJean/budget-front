import { Injectable } from '@angular/core';

import { TRANSACTIONS } from './mock-transaction-list';
import { Transaction } from './transaction';

@Injectable()
export class TransactionService {

  getTransationList(): Transaction[] {
    return TRANSACTIONS;
  }

  getTransactionById(transactionID: number): Transaction|undefined {
    return TRANSACTIONS.find(transaction => transaction.id == transactionID)
  }
}
