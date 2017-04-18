import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes, appRoutingProviders } from './app.routing';
import { InvalidPageComponenet } from './Pages/InvalidPage/InvalidPage.component';
import { TransactionsPageComponent } from './Pages/TransactionsPage/TransactionsPage.component';
import { CreateTransactionPageComponent } from './Pages/CreateTransactionPage/CreateTransactionPage.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { BuisnessLogicService } from './BuisnessLogic.service';
import { LoginService } from './Login/Login.service';
import { TransactionsService } from './Transactions/Transactions.service';
import { TransactionsComponent } from './Transactions/Transactions.component';
import { CreateTransactionComponent } from './GlobalComponents/CreateTransaction/CreateTransaction.component';
import { CreateTransactionService } from './GlobalComponents/CreateTransaction/CreateTransaction.service';
import { SimPickerComponent } from './GlobalComponents/SimPicker/SimPicker.component';
import { SimPickerService } from './GlobalComponents/SimPicker/SimPicker.service';
import { PhonePickerComponent } from './GlobalComponents/PhonePicker/PhonePicker.component';
import { PhonePickerService } from './GlobalComponents/PhonePicker/PhonePicker.service';
import { MenuComponent } from './Menu/Menu.component';
import { PlanPickerComponent } from './GlobalComponents/PlanPicker/PlanPicker.component';
import { PlanPickerService } from './GlobalComponents/PlanPicker/PlanPicker.service';

@NgModule({
  declarations: [
    AppComponent,
    InvalidPageComponenet,
    TransactionsPageComponent,
    LoginComponent,
    CreateTransactionPageComponent,
    TransactionsComponent,
    CreateTransactionComponent,
    SimPickerComponent,
    PhonePickerComponent,
    MenuComponent,
    PlanPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [
    appRoutingProviders,
    BuisnessLogicService,
    LoginService,
    TransactionsService,
    CreateTransactionService,
    SimPickerService,
    PhonePickerService,
    PlanPickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
