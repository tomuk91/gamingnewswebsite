import { SharedModule } from 'src/app/shared/shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './pages/register/register.component'
import { LoginComponent } from './pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from '../../core/guards/auth-guard.guard'
import { ResetPasswordComponent } from './pages/reset_password/reset-password.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [AuthGuard, SharedModule]
})
export class UserModule {}
