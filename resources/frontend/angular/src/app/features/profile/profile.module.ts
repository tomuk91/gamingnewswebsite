import { MatIconModule } from '@angular/material/icon';
import { ProfileDetailsComponent } from './pages/profile-content/profile-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickStatsComponent } from './components/profile-stats/quick-stats.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AccoladesComponent } from './components/Accolades/accolades.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileImageUploadComponent } from './components/profile_image_upload/profile-image-upload.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { MessageNavComponent } from './pages/messages/components/inbox-nav/message-nav.component';
import { InboxComponent } from './pages/messages/pages/inbox/inbox.component';
import { MessagesComponent } from './pages/messages/pages/messages/messages.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccoladeProgressComponent } from './components/accolade-progress/accolade-progress.component';
import { AccountServicesComponent } from './components/account-services/account-services.component';
@NgModule({
  declarations: [
    ProfileImageUploadComponent,
    ProfileComponent,
    QuickStatsComponent,
    AccoladesComponent,
    UserPostsComponent,
    ProfileDetailsComponent,
    ProfileHeaderComponent,
    MessageNavComponent,
    InboxComponent,
    MessagesComponent,
    AccoladeProgressComponent,
    AccountServicesComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
})
export class ProfileModule {}
