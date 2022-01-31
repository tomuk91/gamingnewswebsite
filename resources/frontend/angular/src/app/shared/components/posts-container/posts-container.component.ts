import { PostDetails } from 'src/app/features/posts/post-details'
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { PostsService } from 'src/app/core/services/posts.service'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
  @Input() posts!: PostDetails[];
  @Output() votedEvent = new EventEmitter();

  public error = '';

  constructor (
    public postService: PostsService,
    private auth: AuthenticationService,
    private postsService: PostsService,
    private notify: NotificationService
  ) {}

  ngOnInit (): void {
  }

  // public methods

  /**
   * Checks auth login status
   * If user not logged in and try to vote, shows a error via notify
   * If user is logged in, procceds to send vote to backend.
   */

  public vote (postId: number) {
    if (!this.auth.loginStatus) {
      this.notify.showError('You must login to vote', 'Failed')
      return
    }
    const data = {
      post_id: postId
    }

    this.postsService.vote(data).subscribe(
      (vote: any) => {
        alert(vote.message)
        this.votedEvent.emit('voted!')
        return vote
      },
      (error) => {
        this.error = error.error
      }
    )
  }
}
