import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
