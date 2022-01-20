import { PostDetails } from 'src/app/features/posts/post-details'
import { Component, OnInit } from '@angular/core'
import { PostsService } from 'src/app/core/services/posts.service'
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // INFINITE SCROLL
  throttle = 0;
  distance = 2;
  page = 1;
  offset = 6;
  orderBy = 'desc';
  // DATA
  public posts: PostDetails[] = [];
  public featuredPosts: PostDetails[] = [];
  public title = 'Recently Approved';

  constructor (private postService: PostsService) {}

  ngOnInit (): void {
    this.getLatestApprovedPosts()
    this.getFeaturedPosts()
  }

  // EVENT IF USER VOTED - REFRESH;
  public voted (event: Event) {
    if (event) {
      this.ngOnInit()
    }
  }

  // DATA
  public getFeaturedPosts () {
    this.postService.featuredPosts().subscribe((posts) => {
      this.featuredPosts = posts
    })
  }

  public getLatestApprovedPosts () {
    this.postService
      .latestApprovedPosts(this.page, this.offset, this.orderBy)
      .subscribe((posts: any) => {
        this.posts = posts.data
        this.page = posts.current_page
      })
  }

  // INFINITE SCROLL
  public onScroll () {
    this.postService
      .latestApprovedPosts(++this.page, this.offset, this.orderBy)
      .subscribe((posts: any) => {
        this.posts.push(...posts.data)
      })
  }
}
