import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/models/login.models';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input()
  userLogin: Login = new Login();
  @Output()
  userLoginChange: EventEmitter<Login> = new EventEmitter<Login>();
  data: any;
  isOpen: boolean = true;

  constructor(public loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.addLogin(this.userLogin).subscribe(d => {
      console.log(d);
      this.data = d;

      if (this.data != null) {
        sessionStorage.setItem('token', JSON.stringify(this.data));

        this.router.navigateByUrl('home');
      }
       else {
        console.log('User not found');
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);
      alert("משתמש לא קיים ,מועבר לדף רישום");
      this.router.navigate(['/register']);
    });
  }


  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  
}







