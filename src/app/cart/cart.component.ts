import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addcart } from 'src/models/addcart.models';
import { Order } from 'src/models/Order.model';
import { orderItem } from 'src/models/orderItem.model';
import { Product } from 'src/models/Product.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private homeService: HomeService, private router: Router) { }
  listCart: orderItem[] = []
  cart:addcart[]=[]
  listGF: Product[] = [];
  order: Order[] = []
  listProduct: any[] = []; 
  orderItems: orderItem[] = []
  addcart: addcart = new addcart();
  orderItem: orderItem = new orderItem();

    ngOnInit() {
      this.homeService.reloadBuy$.subscribe(x => {
        this.homeService.getCart().subscribe(data => {
          this.listGF = data;
        
      });
    });

    }

   
    deleteFromCart(productId: number) {
      this.homeService.deleteFromCart(productId).subscribe(
        (data: Product[]) => {
          this.listGF = data;
          console.log('Product deleted from cart:', data);
          // נגדיר את הניתוב מחדש אחרי מחיקה
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/cart']);
        },
        (error) => {
          console.error('Error deleting from cart:', error);
        }
      );
    }

redirectToCartPage() {
  this.router.navigate(['/pay']); 
}
getTotalPayment(): number {
  let totalPayment = 0;
  for (let product of this.listGF) {
    totalPayment += product.price * product.quantity;
  }
  return totalPayment;
}

 
  }




