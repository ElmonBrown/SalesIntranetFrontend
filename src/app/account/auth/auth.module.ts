import { ClientModule } from './../../modules/client/client.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CheckTaxPayerComponent } from './check-tax-payer/check-tax-payer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TransferApprovalComponent } from './transfer-approval/transfer-approval.component';
import { TransferRejectdComponent } from './transfer-rejectd/transfer-rejectd.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClientModule
  ],
  declarations: [AuthRoutingModule.components, RegisterComponent, CheckTaxPayerComponent, CreateAccountComponent, TransferApprovalComponent, TransferRejectdComponent],
  providers: []
})
export class AuthModule { }
