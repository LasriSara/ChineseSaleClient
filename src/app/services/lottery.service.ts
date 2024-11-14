import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, distinctUntilChanged } from 'rxjs/operators';
import { Lottery } from 'src/models/Lottery.models';
import { Product } from 'src/models/Product.model';
@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private httpClient: HttpClient) { }

  private reloadGiftSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGift$: Observable<boolean> = this.reloadGiftSubject.asObservable().pipe(distinctUntilChanged());


  getGifts(): Observable<Product[]>{
    let url = 'https://localhost:7233/api/Product/GetProduct';
    return this.httpClient.get<Product[]>(url);

    
  }   

  
  setReloadLottery(){
    let flag = this.reloadGiftSubject.value;
    this.reloadGiftSubject.next(!flag);
  }

// הגדרת responseType בקריאה לשרת
hagrala(productId: number): Observable<Lottery> {
  
  let url = `https://localhost:7233/api/Lottery/${productId}`;
  return this.httpClient.post<Lottery>(url,{});
}

getwinner(): Observable<Lottery[]> {
  
  let url = `https://localhost:7233/api/Lottery`;
  return this.httpClient.get<Lottery[]>(url);
}

total(): Observable<number> {
  
  let url = `https://localhost:7233/api/Lottery/total`;
  return this.httpClient.get<number>(url);
}




}


