import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { PricingComponent } from './pricing/pricing.component';
import { BuildResumeComponent } from './build-resume/build-resume.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { CompanyComponent } from './company/company.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { TosComponent } from './tos/tos.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'view/:userName',
    component: ViewComponent
  },
  {
    path: 'userprofile',
    component: UserProfileComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'upgrade',
    component: UpgradeComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'resume',
    component: BuildResumeComponent
  },
  {
    path: 'card',
    component: OrderCardComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'orderConfirmation',
    component: OrderConfirmationComponent
  },
  {
    path: 'registerConfirm',
    component: RegisterConfirmationComponent
  },
  {
    path: 'tos',
    component: TosComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
