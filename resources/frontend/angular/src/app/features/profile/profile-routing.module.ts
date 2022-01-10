import { ConversationComponent } from './pages/messages/pages/conversation/conversation.component';
import { InboxComponent } from './pages/messages/components/inbox/inbox.component';
import { MessageNavComponent } from './pages/messages/message-nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { ProfileDetailsComponent } from './pages/profile-content/profile-details.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'profile',
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
          },
          {
            path: 'inbox',
            component: InboxComponent,
          },
          {
            path: 'conversation/:id',
            component: ConversationComponent,
          },
        ],
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
