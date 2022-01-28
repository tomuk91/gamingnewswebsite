import { Subscription } from 'rxjs'
import { PostDetails } from 'src/app/features/posts/post-details'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/core/services/posts.service'

@Component({
  selector: 'app-posts-category',
  templateUrl: './posts-category.component.html',
  styleUrls: ['./posts-category.component.scss']
})
export class PostsCategoryComponent implements OnInit {
  protected categoryId!: number;
  protected postSub!: Subscription;
  public posts!: PostDetails[];
  public title: string = '';
  public description: string = '';

  constructor (
    private activatedRoute: ActivatedRoute,
    public postService: PostsService
  ) {}

  ngOnInit (): void {
    // gets category id from route
    this.postSub = this.activatedRoute.params.subscribe((paramsId) => {
      this.categoryId = paramsId.id
      this.getPosts()
    })
  }

  // public methods

  /**
 * Retrieves posts by category ID
 * Updates title and Description variables for use in PostsHeaderComponent
 */

  public getPosts () {
    this.postService
      .postsByCategory(this.categoryId)
      .subscribe((posts: PostDetails[]) => {
        this.posts = posts
        this.title = posts[0].categories[0].name
        this.description = posts[0].categories[0].description
      })
  }

  ngOnDestroy (): void {
    this.postSub.unsubscribe()
  }
}
