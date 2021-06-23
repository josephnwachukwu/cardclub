import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterModule } from '@angular/router'

import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TosComponent } from './tos/tos.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { HelpComponent } from './help/help.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { BuildResumeComponent } from './build-resume/build-resume.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { CompanyComponent } from './company/company.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    TosComponent,
    PrivacyComponent,
    ViewComponent,
    HomeComponent,
    PricingComponent,
    HelpComponent,
    OrderCardComponent,
    BuildResumeComponent,
    UpgradeComponent,
    CompanyComponent,
    OrderConfirmationComponent,
    RegisterConfirmationComponent,
    DashboardComponent,
    ProductsComponent,
    ViewproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AuthModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewComponent,
    HomeComponent
  ]
})
export class AppModule { }
