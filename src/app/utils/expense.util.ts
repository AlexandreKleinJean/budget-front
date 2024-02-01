//************************** CALCULS **************************//

import { Transaction } from '../transaction/transaction';

/*--------------------Montants par category----------------------*/
export function amountByCategory(transactions: Transaction[]): {} {
  let expensesByCategory:{ [category: string]: number } = {};

  transactions.forEach(transaction => {

    // (exemple) => si "food" n'existe pas => "{food: 0}"
    if (!expensesByCategory[transaction.category]) {
      expensesByCategory[transaction.category] = 0;
    }

    // (exemple) => "{food: (0 + montant de la transaction de category "food")}
    expensesByCategory[transaction.category] += transaction.amount;
  });

  return expensesByCategory;
}

/*----------------------Total des montants-----------------------*/
export function totalAmount(transactions: Transaction[]): number {
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    totalExpenses += transaction.amount;
  });

  return totalExpenses
}

/*-----------------Conversion des montants en $-------------------*/
export const rateToCash = (expense: number, salary: number): number => {
  return (expense * 100) / salary;
};
