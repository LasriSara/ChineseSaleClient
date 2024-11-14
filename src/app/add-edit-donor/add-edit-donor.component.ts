import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Donor } from 'src/models/Donor.model';
import { Product } from 'src/models/Product.model';
import { productValidator } from '../infrastucture/productValidator';
import { DonorService } from '../services/donor.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-donor',
  templateUrl: './add-edit-donor.component.html',
  styleUrls: ['./add-edit-donor.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class AddEditDonorComponent {
  addddonor: EventEmitter<Donor> = new EventEmitter<Donor>();
  @Input() isOpen!: boolean
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() isO!: boolean
  @Output() isOChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() isNew: boolean = false;
  @Input() Donor: Donor = new Donor()
  @Output() DonorChange: EventEmitter<Donor> = new EventEmitter<Donor>();
  @Input() submitted!: boolean;
  listDonor: Product[] = [];
  copyDonor: Product = new Product()
  frmList: FormGroup;
  @Input() donorDialog!: boolean;
  @Input() displayDialog!: boolean;
  @Input() isVisible: boolean = false;
  @Output() Visible: EventEmitter<boolean> = new EventEmitter<boolean>()


  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  constructor(private donorService: DonorService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.frmList = new FormGroup({
      donorId: new FormControl('', [Validators.required, productValidator(this.listDonor)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      myType: new FormControl('', [Validators.required])
    });

  }

  change: SimpleChanges | undefined

  ngOnChanges(changes: SimpleChanges): void {
    this.change = changes;

    this.copyDonor = Object.assign(this.copyDonor, this.Donor);
  }



  saveDonor() {
    this.submitted = true;

    if (!this.validateEmail(this.Donor.email)) {
      alert("נא להכניס מייל תקין")
      return;
    }

    if (this.Donor.firstName.trim()) {
      if (this.Donor.donorId) {
        this.donorService.UpdateDonor(this.Donor).subscribe(b => {
          this.donorService.setReloadGift();
          this.isOpenChange.emit(this.isOpen);

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Updated', life: 3000 });
        });
      }
      else {
        this.donorService.addDonor(this.Donor).subscribe(a => {
          this.donorService.setReloadGift();
          this.isOpenChange.emit(this.isOpen);

        });
      }

      this.hideDialog();
      this.isOpenChange.emit(this.isOpen);

    }
  }



  hideDialog() {
    this.donorDialog = false;
    this.submitted = false;
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);


  }
}
