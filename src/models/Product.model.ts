import { Category } from "./Category.model";
import { Donor } from "./Donor.model";
import { orderItem } from "./orderItem.model";

export class Product
{


  
     productId :number =0;
     name :string='';
    
     quantity:number=0

    donorId :number =0;
 
 
    price :number =10;
    categoryId :number =0;
 
   urlImage :string='';
   isWinner: boolean = false;

   isGiftDrawn: boolean | undefined; 
   orderItems: orderItem[] = []; 

}