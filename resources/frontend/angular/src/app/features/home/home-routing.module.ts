import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FAQComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { SiteComponent } from './pages/site/site.component';
import { TermsComponent } from './pages/terms/terms.component';
const routes: Routes = [
  {
    path: 'site',
    component: SiteComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FAQComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
