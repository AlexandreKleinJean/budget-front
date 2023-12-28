export class Transaction {
  id: number;         // 'SERIAL PRIMARY KEY' en SQL
  subject: string;    // 'TEXT' en SQL
  icon: string        // 'TEXT' en SQL
  date: Date;         // 'date' en SQL
  category: string;   // 'TEXT' en SQL
  amount: number;     // 'DECIMAL' en SQL
  /*accountId: number; // 'INTEGER REFERENCES "account"' en SQL*/

  constructor(id: number, subject: string, icon: string, date: Date, category: string, amount: number) {
    this.id = id;
    this.subject = subject;
    this.icon = icon;
    this.date = date;
    this.category = category;
    this.amount = amount;
  }
}
