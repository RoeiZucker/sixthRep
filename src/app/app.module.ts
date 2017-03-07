import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes, appRoutingProviders} from './app.routing'
import {InvalidPageComponenet} from './Pages/InvalidPage/InvalidPage.component'
import {TransactionsPageComponent} from './Pages/TransactionsPage/TransactionsPage.component'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    InvalidPageComponenet
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
