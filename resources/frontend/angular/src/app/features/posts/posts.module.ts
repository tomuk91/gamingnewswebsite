import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { CommentRepliesComponent } from './components/comment-replies/comment-replies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatSelectModule } from '@angular/material/select';
import { PostsCategoryComponent } from './pages/posts-category/posts-category.component';
import { PendingComponent } from './pages/pending/pending.component';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    PostDetailsComponent,
    PostCommentsComponent,
    CommentRepliesComponent,
    CreateCommentComponent,
    CreatePostComponent,
    PostsCategoryComponent,
    PendingComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule,
    MatSelectModule,
    RxReactiveFormsModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PostsModule {}
