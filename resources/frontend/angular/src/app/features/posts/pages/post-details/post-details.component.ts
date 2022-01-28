import { Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DataService } from 'src/app/core/services/data.service'
import { PostDetails } from 'src/app/features/posts/post-details'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { PostsService } from 'src/app/core/services/posts.service'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
public postId: string = '';
public post!: PostDetails;
public error: string = '';
protected postSub!: Subscription;

constructor (
  private activatedRoute: ActivatedRoute,
  private DataService: DataService,
  private notify: NotificationService,
  public auth: AuthenticationService,
  public postService: PostsService,
  private router: Router
) {}

ngOnInit (): void {
  // get postId from route
  this.postSub = this.activatedRoute.params.subscribe((paramsId) => {
    this.postId = paramsId.id
  })

  this.getPost()
}

// public methods

/**
 * Submit vote form
 * Uses vote method in postService
 * Error displayed if user not logged in
 */

public vote () {
  if (!this.auth.loginStatus) {
    this.notify.showError('You must login to vote', 'Failed')
    return
  }
  const data = {
    post_id: this.postId
  }

  this.postService.vote(data).subscribe(
    (vote: any) => {
      alert(vote.message)
      this.ngOnInit()
      return vote
    },
    (error) => {
      this.error = error.error
    }
  )
}

// private methods

/**
 * Retrieves post data by ID
 * uses DataService
 */
private getPost () {
  this.DataService.getPostById(this.postId).subscribe(
    (post) => {
      this.post = post
    },
    (error) => {
      if (error.status === 404) {
        this.router.navigate(['/404'])
      }
      return error
    }
  )
}

ngOnDestroy (): void {
  this.postSub.unsubscribe()
}
}
