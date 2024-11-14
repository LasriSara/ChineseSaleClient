import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/models/Product.model';
import { productValidator } from '../infrastucture/productValidator';
import { GiftService } from '../services/gift.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AddProductComponent implements OnChanges {

  @Output() addproduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() isOpen: boolean = false
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() isO!: boolean
  @Output() isOChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() isNew: boolean = false;
  @Input() donorId: number = 0;
  @Input() categoryId: number = 0;
  @Input() productId: number = 0;
  @Input() price: number = 0;
  @Input() name: string = '';
  @Input() urlImage: string = '';
  @Output() donorIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() categoryIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() productIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() priceIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() NameIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() urlImageChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() Product: Product = new Product()
  @Output() ProductChange: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() submitted!: boolean;
  ProductDetails: string[] = [];
  listProduct: Product[] = [];
  copyProduct: Product = new Product()
  frmList: FormGroup;
  @Input() productDialog!: boolean;
  @Input() displayDialog!: boolean;
  @Input() isVisible: boolean = false;
  @Output() Visible: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private giftService: GiftService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, private cdr: ChangeDetectorRef
  ) {
    this.frmList = new FormGroup({
      id: new FormControl('', [Validators.required, productValidator(this.listProduct)]),
      name: new FormControl('', [Validators.required]),
      donor: new FormControl('', [Validators.required]),
      price: new FormControl(10, [Validators.required])
    });
  }

  change: SimpleChanges | undefined

  ngOnChanges(changes: SimpleChanges): void {
    this.change = changes;

    this.copyProduct = Object.assign(this.copyProduct, this.Product);
  }





  saveGift() {

    this.submitted = true;

    if (this.Product.name.trim()) {
      if (this.Product.productId) {
        this.giftService.UpdateGift(this.Product).subscribe
          (b => {
            this.giftService.setReloadGift();
            this.giftService.getGifts().subscribe(updatedProducts => {
              this.listProduct = updatedProducts;
              this.isOpenChange.emit(this.isOpen);



            });
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'product Updated', life: 3000 });
          });
      }
      else {
        this.giftService.addGift(this.Product).subscribe(a => {
          this.giftService.setReloadGift();
          this.giftService.getGifts().subscribe(updatedProducts => {
            this.listProduct = updatedProducts;

            this.isOpenChange.emit(this.isOpen);

          });

        });
      }

      this.isOpenChange.emit(this.isOpen);
      this.hideDialog();


    }
  }





  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);

  }



}


