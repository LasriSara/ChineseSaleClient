
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { giftComponent } from './gift/gift.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DonorComponent } from './donor/donor.component';
import { AddEditDonorComponent } from './add-edit-donor/add-edit-donor.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider'; 
import { MultiSelectModule } from 'primeng/multiselect'; 
import { ContextMenuModule } from 'primeng/contextmenu'; 
import { ProgressBarModule } from 'primeng/progressbar'; 
import {CardModule} from 'primeng/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

import {PasswordModule} from 'primeng/password';

import { RippleModule } from 'primeng/ripple';
import { PayComponent } from './pay/pay.component';
import { LotteryComponent } from './lottery/lottery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from 'src/interseptor';
import { CartComponent } from './cart/cart.component';
import { PaymentSuccessDialogComponent } from './payment-success-dialog/payment-success-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    giftComponent,
    AddProductComponent,
    
    DonorComponent,
    AddEditDonorComponent,
    PayComponent,
    LotteryComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    PaymentSuccessDialogComponent,
    // RoleGuardComponent,
  ],
  imports: [
    BrowserModule,
    SliderModule,
    RippleModule,
    MenubarModule,
    HttpClientModule,
    MultiSelectModule,
    ProgressBarModule,
    ContextMenuModule,
    CardModule,
    MatExpansionModule,
    PasswordModule,
    ToastModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    MessageModule,
    
  ],
  providers: [ConfirmationService, MessageService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
