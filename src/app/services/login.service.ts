import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/models/login.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  private reloadLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadLogin$: Observable<boolean> = this.reloadLoginSubject.asObservable();


  addLogin(login: Login) :Observable<any> {
    let url = 'https://localhost:7233/api/Customer/login';
    return this.httpClient.post<any>(url, login)
  }
 
  DeleteLogin(id:number):Observable<boolean> {

   let url = `https://localhost:7233/api/Login/DeleteLogin/?id=${id}`;
   return this.httpClient.delete<boolean>(url)
   }

   

  setReloadLogin(){
    let flag = this.reloadLoginSubject.value;
    this.reloadLoginSubject.next(!flag);
  }
}



