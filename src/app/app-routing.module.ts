import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Donor } from 'src/models/Donor.model';
// import { RoleGuard } from 'src/role.guard';
import { CartComponent } from './cart/cart.component';
import { giftComponent } from './gift/gift.component';
import { DonorComponent } from './donor/donor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LotteryComponent } from './lottery/lottery.component';
import { PayComponent } from './pay/pay.component';
import { PaymentSuccessDialogComponent } from './payment-success-dialog/payment-success-dialog.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},

  {path:'gift',component:giftComponent},
  {path:'donor',component:DonorComponent,},
  {path:'pay',component:PayComponent},
  {
    path: 'lottery',
    component: LotteryComponent,

    
  },  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },

  { path: 'payment-success', component: PaymentSuccessDialogComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
