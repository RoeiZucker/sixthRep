import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes, appRoutingProviders} from './app.routing'
import {InvalidPageComponenet} from './Pages/InvalidPage/InvalidPage.component'
import {TransactionsPageComponent} from './Pages/TransactionsPage/TransactionsPage.component'
import {CreateTransactionPageComponent} from  './Pages/CreateTransactionPage/CreateTransactionPage.component'
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import {BuisnessLogicService} from './BuisnessLogic.service'
import {LoginService} from './Login/Login.service'

@NgModule({
  declarations: [
    AppComponent,
    InvalidPageComponenet,
    TransactionsPageComponent,
    LoginComponent,
    CreateTransactionPageComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [appRoutingProviders, BuisnessLogicService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
