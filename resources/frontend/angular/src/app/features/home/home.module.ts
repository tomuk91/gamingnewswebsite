import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { HomeRoutingModule } from './home-routing.module';
import { SiteComponent } from './pages/site/site.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    TermsComponent,
    PrivacyComponent,
    SiteComponent
  ],
  imports: [
    NgxCaptchaModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
