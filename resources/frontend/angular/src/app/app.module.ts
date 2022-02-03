import { HttpSpinnerInterceptor } from './core/interceptors/spinner.interceptor'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { AppComponent } from './app.component'
import { NavbarComponent } from './core/components/navbar/navbar.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { UserModule } from './features/user/user.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PageNotFoundComponent } from './core/components/pagenotfound/page-not-found.component'
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common'
import { PostsModule } from './features/posts/posts.module'
import { DeleteUserComponent } from './core/modals/delete-user/delete-user.component'
import { UpdateUserComponent } from './core/modals/update-user/update-user.component'
import { ContactUserComponent } from './core/modals/contact-user/contact-user.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ForgotPasswordComponent } from './core/modals/forgot-password/forgot-password.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner/'
import { FooterComponent } from './core/components/footer/footer.component'
import { PaginationModule } from './shared/components/pagination/pagination.module'
import { SharedModule } from './shared/shared.module'
import { AuthInterceptor } from './core/interceptors/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    ForgotPasswordComponent,
    FooterComponent,
    ContactUserComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000
    }),
    RouterModule.forRoot([
      {
        path: 'home',
        loadChildren: () =>
          import('./core/components/home/home.module').then(
            (m) => m.HomeModule
          )
      },
      {
        path: 'site',
        loadChildren: () =>
          import('./features/site/site.module').then(
            (m) => m.SiteModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          )
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    PaginationModule,
    UserModule,
    PostsModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
