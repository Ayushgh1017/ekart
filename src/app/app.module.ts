import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShippingDetailsComponent } from './components/checkout/shipping-details/shipping-details.component';
import { PaymentDetailsComponent } from './components/checkout/payment-details/payment-details.component';
import { OrderSummaryComponent } from './components/checkout/order-summary/order-summary.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { CartModuleModule } from './cart-module/cart-module.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    ShippingDetailsComponent,
    PaymentDetailsComponent,
    OrderSummaryComponent,
    MatDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AuthModuleModule,
    CartModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
