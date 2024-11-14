
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';



@Injectable({
    providedIn: 'root',
  })
  export class RoleGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = sessionStorage.getItem('token');
  
      if (token) {
        const roles = JSON.parse(token).roles;
        
        if (roles) {
          const lowerRoles = roles.toLowerCase();
  
          if (lowerRoles === 'manager') {
            return true;
          } else if (lowerRoles === 'seller') {
            const allowedRoutes = ['/home', '/pay', '/cart', '/payment-success', '/register', '/login'];
  
            if (allowedRoutes.some(allowedRoute => state.url.includes(allowedRoute))) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }
        }
      }
  
      this.router.navigate(['/login']);
      return false;
    }
  }
  