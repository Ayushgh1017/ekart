import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'product/:id/checkout',
    component: CheckoutComponent,
    data : { action: 'buy' },
    canActivate: [authGuard]
  },
  {
    path: 'checkout/:finalAmount',
    component: CheckoutComponent,
    data : { action: 'cart' },
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
