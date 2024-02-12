import { Transaction } from '../transaction/transaction';

//************* Montants par category par transaction *****************/
export function amountByCategoryByAccount(transactions: Transaction[]): {} {

  // je crée un objet vide { [clé]: valeur }
  let expensesByCategoryByAccount:{ [category: string]: number } = {};

  transactions.forEach(transaction => {

    // (exemple) => si "Food" n'existe pas => {food: 0}
    if (!expensesByCategoryByAccount[transaction.category]) {
      expensesByCategoryByAccount[transaction.category] = 0;
    }

    // (exemple) => {Food: (0 + montant de la transaction de category "food")}
    expensesByCategoryByAccount[transaction.category] += transaction.amount;
  });

  // (exemple) => {Food: 50, Transport: 120 }
  return expensesByCategoryByAccount;
}

/*--------------------Montants par category----------------------*/

export function amountByCategoryFusion(
  expensesByCategoryByAccount: { [accountId: number]: { [category: string]: number } })
  : { [category: string]: number } {

  let globalExpensesByCategory: { [category: string]: number } = {};

  // Object.values = { 1: {Food: 50}, 2: {Leisure: 100} } => [{Food: 50}, {Leisure: 100}]
  Object.values(expensesByCategoryByAccount).forEach(oneAccount => {

    // Object.entries = [{Food: 50}, {Leisure: 100}] => [["Food", 50], ["Leisure", 100]]
    Object.entries(oneAccount).forEach(([category, amount]) => {

      if (!globalExpensesByCategory[category]) {
        globalExpensesByCategory[category] = 0;
      }
      globalExpensesByCategory[category] += amount;
    });
  });

  return globalExpensesByCategory;
}

/*----------------------Total des montants-----------------------*/
export function totalAmount(transactions: Transaction[]): number {
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    totalExpenses += transaction.amount;
  });

  return totalExpenses
}

/*-----------------Conversion des % en $-------------------*/
export const rateToCash = (expense: number, salary: number): number => {
  return (expense * 100) / salary;
};

/*-----------------Conversion des % en $-------------------*/
export const rateToAmount = (expense: number, salary: number): number => {
  return (expense / 100) * salary;
};
