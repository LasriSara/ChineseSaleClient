import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Lottery } from 'src/models/Lottery.models';
import { Order } from 'src/models/Order.model';
import { Product } from 'src/models/Product.model';

import { LotteryService } from '../services/lottery.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent {



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

  listProduct: Product[] = [];
  Product: Product = new Product();
  isNew: boolean = false;
  name: string = '';
  donorName: string = '';
  numOfPurcheses: number = 0;
  orderItemId: number | undefined;
  orderId: number | undefined;
  productId: number | undefined;
  quantity: number | undefined;
  product: string | undefined;

  donorDialog!: boolean;
  buttonClicked = false;
  listLottery: Lottery[] = [];
  lottery: Lottery = new Lottery();
  Lottery: number | string | undefined;  

  constructor(public lotteryService: LotteryService, private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.lotteryService.reloadGift$.subscribe 
    this.lotteryService.getGifts().subscribe((data) => 
    this.listProduct = data)
    console.log(this.listProduct); 
 
  }







disableButton() {
  this.buttonClicked = true;
}


hagrala(productId: number) {
  this.lotteryService.hagrala(productId).subscribe(
    (res: any) => {
      console.log('Response:', res);
      if (res && res.customerId !== undefined && !this.buttonClicked) {
        const message = `Customer ${res.customerId} won Gift ${productId}`;
        alert(message);
        console.log(message);
        this.lotteryService.setReloadLottery();
        this.buttonClicked = true;
      } else {
        console.warn('Invalid response:', res);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lottery already conducted for this product.' });
      }
    },
    (error) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while conducting the lottery.' });


  }
  );
}





    getwinner() {
      this.lotteryService.getwinner().subscribe((data) => {
        this.listLottery = data;
        const dialogContent = JSON.stringify(this.listLottery);
        
        this.messageService.add({ severity: 'info', summary: 'Lottery Winners', detail: dialogContent });
        

      });
    }
    
    total() {
      this.lotteryService.total().subscribe(
        (data) => {
          this.Lottery = data;
          const dialogContent = JSON.stringify(this.Lottery);
          
          this.messageService.add({ severity: 'info', summary: 'revenues-total', detail: dialogContent });
          
        },
        (error) => {
          console.error('Error fetching total:', error);
        }
      );
    }
    

   
    
    
    
    
  
    
    
    
    hideDialog() {
      this.isOpen = false;
      this.submitted = false;
    }
    
    
    hideDialoga() {
      this.isO = false;
      this.submitted = false;
    }
    openNew() {
      this.lottery = new Lottery(); 
      this.isNew = true; 
      this.donorDialog = true;
    }
    
    
    
  }