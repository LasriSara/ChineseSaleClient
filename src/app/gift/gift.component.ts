import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/models/Product.model';
import { GiftService } from '../services/gift.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import axios from 'axios';
import { Order } from 'src/models/Order.model';


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class giftComponent {
  purchasesList: any[] = []; 
  productDialog!: boolean;
  selectedIndex: number = 0;
  submitted!: boolean;
  isOpen!: boolean;
  isO!: boolean;

  displayDialog: boolean = false;
  selectedProduct: Order[] = [];
  sortedGiftsByPrice: Product[] = [];
  sortedGiftsByMaxQuantity: Product[] = [];
  purchasesDetails: string[] = [];
  listGF: any[] = []; 
  selectedGifts: any[] = []; 
  listProduct: Product[] = [];
  Product: Product = new Product();
  isNew: boolean = false;
  name: string = '';
  donorName: string = '';
  numOfPurcheses!: number;
  orderItemId: number | undefined;
  orderId: number | undefined;
  productId: number | undefined;
  quantity: number | undefined;
  product: string | undefined;
  constructor(public giftService: GiftService,private messageService: MessageService, private confirmationService: ConfirmationService,    private cdr: ChangeDetectorRef  // Add this line
  ) { }



ngOnInit() {
  this.giftService.reloadGift$.subscribe(() => {
    this.giftService.getGifts().subscribe((data) => {
      this.listProduct = data;
    });
  });
}

reloadPage() {
  location.reload();
}

  addNewProduct(Product:Product){
     this.giftService.addGift(Product).subscribe(res => {
      if(res){
        this.giftService.setReloadGift();
        this.giftService.getGifts().subscribe(updatedProducts => {
          this.listProduct = updatedProducts;
    
        }); 
      }
      //  this.saveGift.emit(Product);

    })
      
  
}



  copyProduct(k: Product, copyProduct: any) {
    throw new Error('Method not implemented.');
  }


 

  updateProduct(product: Product) {
    console.log('Update product called with:', product);
    this.giftService.UpdateGift(product).subscribe
    (
      res => {
        if (res) {
          this.giftService.setReloadGift();
          this.giftService.getGifts().subscribe(updatedProducts => {
            this.listProduct = updatedProducts;
      
          }); 
         
        }
      
      },
      
    );  
 
    this.Product = {...product} ;
    this.productDialog = true;
    this.submitted = false; // Reset the form state

  }
  
  


delete(ProductId: number) {
  this.giftService.delete(ProductId).subscribe(
    res => {
      if (res) {
        this.giftService.setReloadGift();
      }
      this.giftService.getGifts().subscribe(updatedDonors => {
        this.listProduct = updatedDonors;
      });
    },
  );
}

  
getGiftSearch( ) {
  if ( this.name.trim() === ''&&this.donorName.trim() === ''&&this.numOfPurcheses === 0) {
    this.giftService.getGifts().subscribe(data => {
      this.listProduct = data;
      console.log('All Gifts:', data);
    });
  }
  this.giftService.SearchGift(this.name, this.donorName, this.numOfPurcheses).subscribe(
    (data) => {
      this.listProduct = data;
      console.log(data);
      // alert(data)
      

      
    },
   
  );
}


openNew() {

  this.Product = new Product(); 
  this.productDialog = true;
  this.submitted = false; 
}


GetGiftCardsa(product: Product): void {
  this.giftService.GetGiftCards(product).subscribe(
    (res) => {
      console.log('Response:', res); // Add this line
      if (res) {
        this.giftService.setReloadGift();
        console.log(res);
        this.selectedProduct = res;
        this.isOpen = true;
      }
    },
  );
}

getSortedGiftsByMaxQuantitya() {
  this.giftService.getSortedGiftsByMaxQuantity().subscribe(
    (data) => {
      this.listProduct = data;
      console.log(data);
    }
  );
}

getSortedGiftsByPricea(){
  this.giftService.getSortedGiftsByPrice().subscribe((data) => {
    this.listProduct = data;
    console.log(data);

  });}

}
