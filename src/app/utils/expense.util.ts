import { Transaction } from '../transaction/transaction';

/*-------------Calculer les montants par category----------------*/
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

/*----------------Calcul du total des montants------------------*/
export function totalAmount(transactions: Transaction[]): number {
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    totalExpenses += transaction.amount;
  });

  return totalExpenses
}
