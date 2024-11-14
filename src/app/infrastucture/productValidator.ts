
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Product } from "src/models/Product.model";

export function productValidator(listProduct: Product[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }

    if (control.value) {
      for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].name === control.value) {
          return { duplicate: true };
        }
      }
    }

    return null;
  };
}

  
