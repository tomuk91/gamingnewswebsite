import { HomeComponent } from './components/Home/home.component';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/app/shared/shared.module';
import { FAQComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TermsComponent,
    PrivacyComponent,
    SiteComponent,
    FAQComponent
  ],
  imports: [
    InfiniteScrollModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
