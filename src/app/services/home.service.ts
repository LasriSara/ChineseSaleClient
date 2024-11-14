import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { addcart } from 'src/models/addcart.models';
import { Order } from 'src/models/Order.model';
import { Product } from 'src/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  private reloadBuySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadBuy$: Observable<boolean> = this.reloadBuySubject.asObservable();


  setReloadGift(){
    let flag = this.reloadBuySubject.value;
    this.reloadBuySubject.next(!flag);
  }
  getCart(): Observable<Product[]> {
    const url = `https://localhost:7233/api/Order/GetCart`;
    return this.httpClient.get<Product[]>(url);
  }

  addToCart(giftId: number, quantity: number): Observable<Product[]> {
    const url = `https://localhost:7233/api/Order/?giftId=${giftId}&q=${quantity}`;
    return this.httpClient.post<Product[]>(url, {});
  }

  deleteFromCart(productId: number): Observable<Product[]> {
    const url = `https://localhost:7233/api/Order/deleteFromCartById?productId=${productId}`;
    return this.httpClient.put<Product[]>(url, {});
  }

  getPresentByCategory(categoryName: string): Observable<any[]> {
    const url = `https://localhost:7233/api/Product/byCategory/${categoryName}`;
    return this.httpClient.get<any[]>(url);
  }

  getProducts(minPrice?: number, maxPrice?: number): Observable<any[]> {
    let url = `https://localhost:7233/api/Product/byPrice`;

    if (minPrice !== undefined) {
      url += `?minPrice=${minPrice}`;
    }
    if (maxPrice !== undefined) {
      url += (minPrice !== undefined ? `&maxPrice=${maxPrice}` : `?maxPrice=${maxPrice}`);
    }
    return this.httpClient.get<any[]>(url);
  }
  

  makePayment(orderIds: number[]): Observable<any> {
    const url = `https://localhost:7233/api/Order/makePayment`;
    return this.httpClient.put<any>(url, orderIds);
  }


}



