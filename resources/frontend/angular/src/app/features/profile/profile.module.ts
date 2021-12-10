import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageUploadComponent } from './components/profile_image_upload/profile-image-upload.component';
import { ProfileDetailsComponent } from '../profile/pages/profile-content/profile-details.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { QuickStatsComponent } from './components/profile-stats/quick-stats.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AccoladesComponent } from './components/Accolades/accolades.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [
    ProfileImageUploadComponent,
    ProfileDetailsComponent,
    ProfileHeaderComponent,
    ProfileComponent,
    QuickStatsComponent,
    AccoladesComponent,
    UserPostsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  exports: [],
})
export class ProfileModule {}
