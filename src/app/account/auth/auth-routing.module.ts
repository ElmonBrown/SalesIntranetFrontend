import { CreateAccountComponent } from './create-account/create-account.component';
import { CheckTaxPayerComponent } from './check-tax-payer/check-tax-payer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


import { AuthGuard } from './../../core/guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { TransferApprovalComponent } from './transfer-approval/transfer-approval.component';
import { TransferRejectdComponent } from './transfer-rejectd/transfer-rejectd.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent, data: { title: 'Log In' } },
//{ path: 'login', component: LoginComponent, data: { title: 'Log In' }, canActivate: [AuthGuard] },//EJEMPLO DE RUTA PROTEGIDA
{ path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
{ path: 'register', component: RegisterComponent, data: { title: 'Register' } },
{ path: 'taxPayer', component: CheckTaxPayerComponent, data: { title: 'TaxPayer' } },
{ path: 'createAccount', component: CreateAccountComponent, data: { title: 'CreateAccount' } },
{ path: 'transferApproval', component: TransferApprovalComponent, data: { title: 'TransferApproval' } },
{ path: 'transferApproval/:id/:token', component: TransferApprovalComponent, data: { title: 'TransferApproval' } },
{ path: 'transferRejectd', component: TransferRejectdComponent, data: { title: 'transferRejectd' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    CheckTaxPayerComponent,
    CreateAccountComponent
  ];

}
