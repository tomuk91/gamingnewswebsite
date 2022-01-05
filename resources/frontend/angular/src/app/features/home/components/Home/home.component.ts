import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  throttle = 0;
  distance = 2;
  page = 1;
  offset = 6;
  orderBy = 'desc';
  posts: any = [];
  featuredPosts: any = [];
  title = 'Recently Approved';

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.getLatestApprovedPosts();
    this.getFeaturedPosts();
  }

  voted(event: Event) {
    if (event) {
      this.ngOnInit();
    }
  }

  getFeaturedPosts() {
    this.postService.featuredPosts().subscribe(
      (posts) => {
        this.featuredPosts = posts;
      }
    )
  }

  getLatestApprovedPosts() {
    this.postService
      .latestApprovedPosts(this.page, this.offset, this.orderBy)
      .subscribe((posts: any) => {
        this.posts = posts.data;
        this.page = posts.current_page;
      });
  }

  onScroll() {
    this.postService
      .latestApprovedPosts(++this.page, this.offset, this.orderBy)
      .subscribe((posts: any) => {
        this.posts.push(...posts.data);
      });
  }
}
