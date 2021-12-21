import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommentsService } from 'src/app/core/services/comments-service';
import { PostsService } from 'src/app/core/services/posts.service';
@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() postId!: string;
  comments: any[] = [];
  offset!: boolean;
  hideReplyForm: any[];
  errorMessage: string = '';
  isLoggedIn!: Observable<any>;

  constructor(
    public commentsService: CommentsService,
    public auth: AuthenticationService,
    public postService: PostsService,
  ) {
    this.hideReplyForm = [];
  }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });

    this.commentsService
      .getCommentsByPostId(this.postId)
      .subscribe((comments) => {
        this.comments = comments;
      }),
      (errors: any) => {
        this.errorMessage = errors;
      };
  }

  replyToComment() {
    this.commentsService.sendReply.next(true);
  }

}
