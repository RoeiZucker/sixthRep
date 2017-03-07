import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {CreateTransactionPageComponent} from './Pages/CreateTransactionPage/CreateTransactionPage.component'
import {InvalidPageComponenet} from './Pages/InvalidPage/InvalidPage.component'
import {TransactionsPageComponent} from './Pages/TransactionsPage/TransactionsPage.component'
const routes: Routes = [
  {
    path:'Transactions',
    component:TransactionsPageComponent
  },
  {
    path: '**',
    component:InvalidPageComponenet
  }
];
export const appRoutingProviders: any[] = [

];

export const AppRoutes : ModuleWithProviders = RouterModule.forRoot(routes);
