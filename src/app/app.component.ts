import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chainaSail';
  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [

          {label: 'תשלום', routerLink: 'pay', routerLinkActive: 'active-link'},
          {label: 'הצג סל', routerLink: 'cart', routerLinkActive: 'active-link'}  ,
          {label: 'הגרלה', routerLink: 'lottery', routerLinkActive: 'active-link'},
          {label: 'רשימת תורמים', routerLink: 'donor', routerLinkActive: 'active-link'},
          {label: 'רשימת מתנות', routerLink: 'gift', routerLinkActive: 'active-link'},  
          {label: 'בית', routerLink: 'home', routerLinkActive: 'active-link'},
          {label: 'הרשמה', routerLink: 'register', routerLinkActive: 'active-link'},
          {label: 'כניסה', routerLink: 'login', routerLinkActive: 'active-link'},

    ];
  }

  shouldShowMenuBar(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute.includes('register') || currentRoute.includes('login'));
  }
}
