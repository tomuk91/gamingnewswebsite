import { InboxResolver } from './../../core/resolvers/inbox.resolver';
import { MessagesComponent } from './pages/messages/pages/messages/messages.component';
import { InboxComponent } from './pages/messages/pages/inbox/inbox.component';
import { MessageNavComponent } from './pages/messages/components/inbox-nav/message-nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { ProfileDetailsComponent } from './pages/profile-content/profile-details.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'details/:id',
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
        path: 'messages',
        component: MessageNavComponent,
        children: [
          {
            path: '',
            component: InboxComponent,
            resolve: {
              inbox: InboxResolver,
            },
            runGuardsAndResolvers: 'always'
          },
          {
            path: 'inbox',
            component: InboxComponent,
            resolve: {
              inbox: InboxResolver,
            },
            runGuardsAndResolvers: 'always'
          },
          {
            path: 'conversation/:id',
            component: MessagesComponent,
          },
        ],
      },
      {
        path: '',
        component: ProfileDetailsComponent,
        resolve: {
          user: UserResolver,
        },
        runGuardsAndResolvers: 'always'
      },
    ],
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
