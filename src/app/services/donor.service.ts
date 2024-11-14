import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Donor } from 'src/models/Donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {


  constructor(private httpClient: HttpClient) { }
  private reloadGiftSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGift$: Observable<boolean> = this.reloadGiftSubject.asObservable();


  getDonors(): Observable<Donor[]>{
    let url = 'https://localhost:7233/api/Donor/GetDonor';
    return this.httpClient.get<Donor[]>(url);

    
  }   



  saveDonor(donor: Donor) :Observable<boolean>{
    let url = 'https://localhost:7233/api/Donor/UpdateDonor';
    return this.httpClient.put<boolean>(url, donor);
  }

  addDonor(donor: Donor) :Observable<number> {
    let url = 'https://localhost:7233/api/Donor/AddDonor';
    
    return this.httpClient.post<number>(url, donor)
  }

  setReloadGift(){
    let flag = this.reloadGiftSubject.value;
    this.reloadGiftSubject.next(!flag);
  }

  delete(DonorId: number): Observable<string> {
    let url = `https://localhost:7233/api/Donor/DeleteDonor/${DonorId}`;
    return this.httpClient.delete<string>(url,{ responseType: 'text' as 'json' });
    
}




  UpdateDonor(donor: Donor): Observable<Donor>{ 
    let url = 'https://localhost:7233/api/Donor/UpdateDonor/' + donor.donorId;
    return this.httpClient.put<Donor>(url, donor,{ responseType: 'text' as 'json' });
  }





 getDonorsByNameEmailProduct(firstName: string, email: string,  name:string): Observable<Donor[]> {
    let url = `https://localhost:7233/api/Donor/SelectDonorByNameEmailProduct?name=${firstName}&email=${email}&productName=${name}`;
    return this.httpClient.get<Donor[]>(url);
  } 
 
  GetDonorDetails(DonorId: number): Observable<string[]> {
    let url = `https://localhost:7233/api/Donor/GetDonorDetails/${DonorId}`;
    return this.httpClient.get<string[]>(url);
  }
  
  GetPurchesesDetails(): Observable<string> {
    const url = `https://localhost:7233/api/Order/purchases`;
    return this.httpClient.get<string>(url,{ responseType: 'text' as 'json' });
  }

}
