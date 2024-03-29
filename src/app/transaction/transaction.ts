export class Transaction {
  id: number;         // 'SERIAL PRIMARY KEY' en SQL
  subject: string;    // 'TEXT' en SQL
  note: string;       // 'TEXT' en SQL
  category: string;   // 'TEXT' en SQL
  amount: number;     // 'DECIMAL' en SQL
  accountId: number; // 'INTEGER REFERENCES "account"' en SQL

  constructor(id: number, subject: string, note: string, category: string, amount: number) {
    this.id = id;
    this.subject = subject;
    this.note = note;
    this.category = category;
    this.amount = amount;
  }
}
