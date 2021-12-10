import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileDetailsComponent } from './pages/profile-content/profile-details.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'details',
        component: ProfileDetailsComponent,
        resolve: {
          user: UserResolver,
        },
      },
      {
        path: 'posts',
        component: UserPostsComponent,
      },
      {
        path: '',
        component: ProfileDetailsComponent,
        resolve: {
          user: UserResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
