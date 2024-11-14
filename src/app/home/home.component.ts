import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { addcart } from 'src/models/addcart.models';
import { Product } from 'src/models/Product.model';
import { GiftService } from '../services/gift.service';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  purchasesList: any[] = []; 
  token: string | undefined;
  selectedCategory: string='';
  categoryProducts: Product[] = [];

  productDialog!: boolean;
  selectedIndex: number = 0;
  submitted!: boolean;
  isOpen!: boolean;
  isO!: boolean;
  selected: number = 0;
  displayDialog: boolean = false;
  sortedGiftsByPrice: Product[] = [];
  sortedGiftsByMaxQuantity: Product[] = [];
  purchasesDetails: string[] = [];
  listGF: Product[] = [];
  selectedCategories: string[] = []; // Add this line
  userId: number | undefined; 
  cart: Product[] | undefined;
  listProduct: Product[] = [];
  Product: Product = new Product();
  isNew: boolean = false;
  listCart:addcart[]=[]
  filteredProducts: any[] = [];
  name: string = '';
  donorName: string = '';
  numOfPurcheses: number = 0;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  // minPrice!: number
  orderItemId: number | undefined;
  selectedGifts: any[] = []; 

  object: addcart = new addcart()
  tokenDetails: any;

  constructor(private homeservice: HomeService, private giftService: GiftService, private httpClient: HttpClient, private router: Router) {   
    
}
  


  ngOnInit() {
    this.giftService.reloadGift$.subscribe(x => {
      this.giftService.getGifts().subscribe(data => this.listGF = data);
    });
    
}


searchProducts() {
  if (this.minPrice !== undefined && this.maxPrice !== undefined) {
    this.homeservice.getProducts(this.minPrice, this.maxPrice).subscribe(
      (data: any[]) => {
        this.listGF = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  } else {
    console.error('minPrice and maxPrice must be defined');
  }
}




addToCart(giftId: number, quantity: number) {
  this.homeservice.addToCart(giftId, quantity).subscribe(
    (data: Product[]) => {
      this.listGF = data;
      console.log('Added to cart:', data);
      
  
      alert('המוצר נוסף לעגלת הקניות בהצלחה!');
     
            
         
            this.router.navigate(['/cart']); 
            console.log('Quantity after adding to cart:', this.listGF.find(p => p.productId === giftId)?.quantity);

    },
    
    (error) => {
      console.error('Error adding to cart:', error);
    }
  );
}




loadCategoryProducts() {

  if ( this.selectedCategory.trim() === '') {
    this.giftService.getGifts().subscribe(data => {
      this.listGF = data;
      console.log('All Gifts:', data);
    });
  } else
  console.log("Category Name:", this.selectedCategory); 

  this.homeservice.getPresentByCategory(this.selectedCategory).subscribe(data => {
    this.listGF = data;
    console.log(data);
  });

}


loadFilteredProducts(): void {
  this.homeservice.getProducts().subscribe(data => {
    this.filteredProducts = data;
  });
}




   

}
    
  













  


