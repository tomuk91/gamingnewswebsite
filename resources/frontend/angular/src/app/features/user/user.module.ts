import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './pages/register/register.component'
import { LoginComponent } from './pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from '../../core/guards/auth-guard.guard'
import { ResetPasswordComponent } from './pages/reset_password/reset-password.component'
import { ErrorMessagesComponent } from '../../../helpers/error-messages.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule
  ],
  providers: [AuthGuard]
})
export class UserModule {}
