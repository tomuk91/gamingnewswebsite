import { Posts } from './posts';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  user_id = this.cookieService.get('id');
  userPosts!: Posts[];

  constructor(
    private dataService: DataService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getUserPosts();
  }

  protected getUserPosts() {
    this.dataService.getUserPosts().subscribe(
      (posts: Posts[]) => {
        this.userPosts = posts;
        return posts;
      },
      (error) => {
        return error;
      }
    );
  }
}
