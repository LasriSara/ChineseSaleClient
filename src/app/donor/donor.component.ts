import { Component } from '@angular/core';
import { Product } from 'src/models/Product.model';
import { DonorService } from '../services/donor.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Donor } from 'src/models/Donor.model';
import { DialogService } from 'primeng/dynamicdialog';
import { Order } from 'src/models/Order.model';
@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
  listDonors: Donor[] = [];
  listOrders: Order[] = []
  donorDetails: string[] = [];
  isNewOrEdit: boolean = false;
  donorDialog!: boolean;
  selectedIndex: number = 0;
  submitted!: boolean;
  isOpen: boolean = false;
  isO!: boolean;
  Donor: string | undefined;

  searchResults: Donor[] = [];

  displayDialog: boolean = false;

  donor: Donor = new Donor();
  selectedDonor: Donor = new Donor();



  isNew: boolean = false;
  name: string = '';
  email: string = '';
  giftId: string = '';
  firstName: string = '';

  constructor(public donorService: DonorService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.donorService.reloadGift$.subscribe(() => {
      this.donorService.getDonors().subscribe((data) => {
        this.listDonors = data;
      });
    });
  }

  showError(errorMessage: string) {

    console.error(errorMessage);
  }




  addNewDonor(Donor: Donor) {
    this.donorService.addDonor(Donor).subscribe(res => {
      if (res) {
        this.donorService.setReloadGift();
        this.donorService.getDonors().subscribe(updatedDonors => {
          this.listDonors = updatedDonors;
          this.isOpen = true;

        });
      }


    })


  }



  copyDonor(k: Donor, copyDonor: any) {
    throw new Error('Method not implemented.');
  }



  updateDonor(donor: Donor) {
    console.log('Update product called with:', donor);
    this.donorService.UpdateDonor(donor).subscribe
      (
        res => {
          if (res) {
            this.donorService.setReloadGift();
            this.donorService.getDonors().subscribe(updatedDonors => {
              this.listDonors = updatedDonors;
            });
          }

        },
      );
    this.donor = { ...donor };
    this.donorDialog = true;
    this.submitted = false;

  }




  delete(ProductId: number) {
    this.donorService.delete(ProductId).subscribe(
      res => {
        if (res) {
          this.donorService.setReloadGift();
          this.donorService.getDonors().subscribe(updatedDonors => {
            this.listDonors = updatedDonors;
          });
        }
      },
    );
  }



  getDonorsSearch() {
    if (this.firstName.trim() === '' && this.email.trim() === '' && this.name.trim() === '') {
      this.donorService.getDonors().subscribe(data => {
        this.listDonors = data;
        console.log('All Gifts:', data);
      });
    }
    this.donorService.getDonorsByNameEmailProduct(this.firstName, this.email, this.name).subscribe(
      (data) => {
        this.listDonors = data;
        console.log(data);
      },
    );
  }



  GetDonorDetailsa(DonorId: number): void {
    this.donorService.GetDonorDetails(DonorId).subscribe(
      (data) => {
        if (data) {
          this.donorService.setReloadGift();
          this.donorDetails = data;
          this.isOpen = true;
          console.log(this.donorDetails);
        }
      },

    );
  }







  openNew() {
    this.donor = new Donor();
    this.donorDialog = true;
    this.submitted = false;
  }




  GetPurchesesDetailsa() {
    this.donorService.GetPurchesesDetails().subscribe((data) => {
      this.Donor = data;
      console.log(data);
      this.isO = true;

      // Display a message with the data
      const dialogContent = JSON.stringify(data);
      this.messageService.add({ severity: 'info', summary: 'Purchase Details', detail: dialogContent });
    });
  }


}
