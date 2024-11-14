// pay.component.ts

import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  constructor(private router: Router,public homeservice: HomeService) { }
  orderIds: number []=[] // הגדרת המשתנה orderId

  // pay() {
  //   // כאן יכולה להיות לוגיקת התשלום או שאר פעולות שאתה רוצה לבצע
  //   // ...

  //   // לאחר הצלחת התשלום, הפעל את הדיאלוג
  //   this.dialogService.open;
  // }
//   payForOrder( orderIds: number[]): void {
//     this.homeservice.payForOrder(orderIds).subscribe((response) => {
//         // כאן תוכל לבצע כל פעולה שתרצה עם התשובה מהשרת
//         console.log('ההזמנות שולמו בהצלחה', response);
//     });
// }

makePayment(orderIds: number[]): void {
  this.homeservice.makePayment(orderIds).subscribe(
    data => {
      console.log('Payment successful:', data);
      this.router.navigate(['/payment-success']);

    },
    error => {
      console.error('Failed to make payment:', error);
    }
  );
}
  redirectToPaymentSuccess() {
    this.router.navigate(['/payment-success']);
    
  }
  
}
