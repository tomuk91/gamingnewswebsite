import { ConversationComponent } from './pages/messages/pages/conversation/conversation.component';
import { InboxComponent } from './pages/messages/components/inbox/inbox.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { ProfileDetailsComponent } from './pages/profile-content/profile-details.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
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
        component: MessagesComponent,
        children: [
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
