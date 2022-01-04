import { HomeModule } from './features/home/home.module';
import { HttpSpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { UserModule } from './features/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/pagenotfound/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { PostsModule } from './features/posts/posts.module';
import { ProfileModule } from './features/profile/profile.module';
import { DeleteUserComponent } from './core/modals/delete-user/delete-user.component';
import { UpdateUserComponent } from './core/modals/update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './core/modals/forgot-password/forgot-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner/';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FooterComponent } from './core/components/footer/footer.component';
import { PaginationModule } from './shared/components/pagination/pagination.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    ForgotPasswordComponent,
    FooterComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
    HomeModule,
    PaginationModule,
    ProfileModule,
    UserModule,
    PostsModule,
  ],
  providers: [
    [CookieService],
    [AuthenticationService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
