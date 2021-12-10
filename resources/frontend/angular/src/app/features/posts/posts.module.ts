import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { CommentRepliesComponent } from './components/comment-replies/comment-replies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogPipe } from 'src/app/shared/pipes/log.pipe';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    PostDetailsComponent,
    PostCommentsComponent,
    CommentRepliesComponent,
    LogPipe,
    CreateCommentComponent,
    CreatePostComponent,
  ],
  imports: [CommonModule, MatSelectModule, RxReactiveFormsModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
