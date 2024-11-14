import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/models/register.model';
import { RegisterService } from '../services/register.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input()
  user: Register = new Register;
  @Output()
  userChange: EventEmitter<Register> = new EventEmitter<Register>()
  isOpen:boolean=true;
  data: any;
  emailValidationError: string = '';

  constructor(public registerService: RegisterService,private router: Router){}
 

    register() {

  // בדיקה שהמייל תקין
  if (this.user.Email && !this.isValidEmail(this.user.Email)) {
    alert('Invalid email address');
    return;
  }
  this.registerService.Register(this.user).subscribe(d => {
    console.log(d);
    this.data = d
   
  if (this.data == true) {
    sessionStorage.setItem("token", JSON.stringify(this.data));
    console.log(this.user.PassWord);
        console.log(this.user.roles);

   
    this.router.navigateByUrl('login');
  }
  else {
    this.router.navigateByUrl('login');
  }
  
    }
  )
  
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  
}