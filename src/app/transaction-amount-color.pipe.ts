import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionAmountColor'
})
export class TransactionAmountColorPipe implements PipeTransform {

  transform(amount: number): string {
    let color:string;
    if (amount >= 0 && amount < 50) {
      color = 'blue';
    } else if (amount >= 50 && amount < 100) {
      color = 'orange';
    } else {
      color = 'red';
    }
    return color;
  }

}
