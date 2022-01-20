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
  public posts!: PostDetails[];
  public title: string = '';
  public description: string = '';

  constructor (
    private activatedRoute: ActivatedRoute,
    public postService: PostsService
  ) {}

  ngOnInit (): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.categoryId = paramsId.id
      this.getPosts()
    })
  }

  // public methods

  public getPosts () {
    this.postService
      .postsByCategory(this.categoryId)
      .subscribe((posts: PostDetails[]) => {
        this.posts = posts
        this.title = posts[0].categories[0].name
        this.description = posts[0].categories[0].description
      })
  }
}
