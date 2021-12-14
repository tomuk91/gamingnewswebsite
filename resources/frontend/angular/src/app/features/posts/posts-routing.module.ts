import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';


const routes: Routes = [
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
