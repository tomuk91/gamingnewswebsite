import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsCategoryComponent } from './pages/posts-category/posts-category.component';


const routes: Routes = [
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'category/:id',
    component: PostsCategoryComponent,
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
