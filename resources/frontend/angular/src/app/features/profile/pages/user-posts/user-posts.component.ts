import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PostsService } from 'src/app/core/services/posts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  @ViewChild(PaginationComponent, { static: true })
  paginator!: PaginationComponent;
  loading = false;
  private _subscribe: Subject<any>;
  userPosts!: any;
  //PAGINATION
  pageOffset: number = 3;
  pageIndex!: number;
  total!: number;
  orderBy: string = '';

  constructor(
    private postsService: PostsService,
    public _DomSanitizationService: DomSanitizer
  ) {
    this._subscribe = new Subject();
  }

  ngOnInit(): void {
    this.loading = true;
    this.pageIndex = 1;
    this.orderBy = 'desc';
  }

  ngAfterContentInit(): void {
    this.paginator.paginate
      .pipe(takeUntil(this._subscribe))
      .subscribe((paginator) => {
        this.pageIndex = paginator.page;
        paginator.pageOffset = this.pageOffset;
        this.getPosts();
      });
  }

  getPosts(): void {
    this.loading = true;
    this.postsService
      .getUserPosts(this.pageOffset, this.pageIndex, this.orderBy)
      .pipe(takeUntil(this._subscribe))
      .subscribe((response) => {
        this.userPosts = response.data;
        this.total = response.total;
        this.pageIndex = response.current_page;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this._subscribe.next();
    this._subscribe.complete();
  }
}
