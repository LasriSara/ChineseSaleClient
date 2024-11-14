import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from 'src/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }
  private reloadRegisterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  reloadRegister$: Observable<boolean> = this.reloadRegisterSubject.asObservable()
  getGivers(): Observable<Register[]> {
    // let url = 'https://localhost:7154/api/Donor/GetAllDonors';
    let url = 'https://localhost:7233/api/Donor/GetAllDonors';

    return this.httpClient.get<Register[]>(url);
  }
  

  Register(user: Register): Observable<boolean> {
    let url = 'https://localhost:7233/api/Customer/register';
    debugger
    return this.httpClient.post<boolean>(url, user)
  }

  setReloadUser() {
    let flag = this.reloadRegisterSubject.value;
    this.reloadRegisterSubject.next(!flag);
  }
}
