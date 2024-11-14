import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/Product.model';
import { catchError, distinctUntilChanged } from 'rxjs/operators';
import axios from 'axios';
import { Order } from 'src/models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  // reloadGift$: any;

  constructor(private httpClient: HttpClient) { }
  
  

  private reloadGiftSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGift$: Observable<boolean> = this.reloadGiftSubject.asObservable();
  

  getGifts(): Observable<Product[]>{
    let url = 'https://localhost:7233/api/Product/GetProduct';
    return this.httpClient.get<Product[]>(url);

    
  }   




  getGiftById(ProductId: number) : Observable<Product>{
    let url = 'http://localhost:7233/api/Gift/Get/' + ProductId;
    return this.httpClient.get<Product>(url);
  }

  saveGift(product: Product) :Observable<boolean>{
    let url = 'https://localhost:7233/api/Product/UpdateProduct';
    return this.httpClient.put<boolean>(url, product);
  }

  addGift(product: Product) :Observable<number> {
    let url = 'https://localhost:7233/api/Product/AddProduct';
    
    return this.httpClient.post<number>(url, product)
  }

  setReloadGift(){
    let flag = this.reloadGiftSubject.value;
    this.reloadGiftSubject.next(!flag);
  }

  delete(ProductId: number): Observable<string> {
    let url = `https://localhost:7233/api/Product/DeleteProduct/${ProductId}`;
    return this.httpClient.delete<string>(url,{ responseType: 'text' as 'json' });
    
}




  UpdateGift(product: Product): Observable<Product>{ 
    let url = 'https://localhost:7233/api/Product/UpdateProduct/' + product.productId;
    console.log(product.productId);
    return this.httpClient.put<Product>(url, product,{ responseType: 'text' as 'json' });
  }



  
  SearchGift(name: string,  donorName :string, numOfPurcheses :number): Observable<Product[]> {
    let url = `https://localhost:7233/api/Product/SearchGifts?name=${name}&donorName=${donorName}&numOfPurcheses=${numOfPurcheses}`;
    return this.httpClient.get<Product[]>(url);
  } 
  



  GetGiftCards(product: Product): Observable<Order[]> {
    let url = `https://localhost:7233/api/Order/${product.name}`;
    return this.httpClient.get<Order[]>(url);
  }
  

  getSortedGiftsByPrice(): Observable<Product[]> {
    const url = `https://localhost:7233/api/Order?price=true`;
    return this.httpClient.get<Product[]>(url, { params: { price: 'true' } });
  }

  getSortedGiftsByMaxQuantity(): Observable<Product[]> {
    const url = `https://localhost:7233/api/Order?maxQuentity=true`;
    return this.httpClient.get<Product[]>(url, { params: { maxQuentity: 'true' } });
  }

}