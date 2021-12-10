import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommentsService } from 'src/app/core/services/comments-service';
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
    public auth: AuthenticationService
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

  calculateDiff(sentDate: string | number | Date) {
    let date1 = moment(sentDate);
    let date2 = moment(new Date());
    return date1.from(date2);
  }
}
