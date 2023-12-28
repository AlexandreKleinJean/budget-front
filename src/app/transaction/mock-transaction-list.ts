import { Transaction } from './transaction';

export const TRANSACTIONS: Transaction[] = [
    { id: 1, subject: 'Wallmart', note: '', icon: 'assets/images/food.png', date: new Date('2023-01-01'), category: 'Nourriture', amount: 50 },
    { id: 2, subject: 'Thai Airlines', note: '', icon: 'assets/images/transport.png', date: new Date('2023-01-02'), category: 'Transport', amount: 30 },
    { id: 3, subject: 'Health factory fitness', note: '', icon: 'assets/images/sport.png', date: new Date('2023-01-03'), category: 'Sport', amount: 20 },
    { id: 4, subject: 'Taxes', note: '', icon: 'assets/images/tax.png', date: new Date('2023-01-04'), category: 'Factures', amount: 100 },
    { id: 5, subject: 'Dior', note: '', icon: 'assets/images/shopping.png', date: new Date('2023-01-05'), category: 'Shopping', amount: 150 },
    { id: 6, subject: 'Wallmart', note: '', icon: 'assets/images/food.png', date: new Date('2023-01-06'), category: 'Nourriture', amount: 60 },
    { id: 7, subject: 'Luftansa', note: '', icon: 'assets/images/transport.png', date: new Date('2023-01-07'), category: 'Transport', amount: 40 },
    { id: 8, subject: 'Drums store', note: '', icon: 'assets/images/sport.png', date: new Date('2023-01-08'), category: 'Loisirs', amount: 80 },
    { id: 9, subject: 'Rent', note: '', icon: 'assets/images/rent.png', date: new Date('2023-01-09'), category: 'Real Estate', amount: 90 },
    { id: 10, subject: 'Chinese restaurant', note: '', icon: 'assets/images/shopping.png', date: new Date('2023-01-10'), category: 'Shopping', amount: 120 }
];
