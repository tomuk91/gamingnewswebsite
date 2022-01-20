import { PostsService } from 'src/app/core/services/posts.service'
import { PostDetails } from 'src/app/features/posts/post-details'
import { Component, OnInit, ViewChild } from '@angular/core'
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html'
})
export class PendingComponent implements OnInit {
@ViewChild(PaginationComponent, { static: true })
private paginator!: PaginationComponent;

private _subscribe: Subject<any>;
public loading = false;
public posts!: PostDetails[];
public error = '';
public title = 'Current Pending Posts';
public description = `
  Once a post has 10 unique likes, it'll will be moved to the home page.
  If a post fails to reach 10 likes, it will be deleted after 30 days.
  Likes can continue after being moved.`;

// PAGINATION
pageOffset: number = 10;
pageIndex!: number;
total!: number;
orderBy: string = '';

constructor (private postsService: PostsService) {
  this._subscribe = new Subject()
}

ngOnInit (): void {
  this.loading = true
  this.pageIndex = 1
  this.orderBy = 'desc'
  this.getPendingPosts()
}

ngAfterContentInit (): void {
  this.paginator.paginate
    .pipe(takeUntil(this._subscribe))
    .subscribe((paginator) => {
      this.pageIndex = paginator.page
      paginator.pageOffset = this.pageOffset
      this.getPendingPosts()
    })
}

// public methods

// EVENT IF USER VOTES
public voted (event: Event) {
  if (event) {
    this.ngOnInit()
  }
}

// private methods

private getPendingPosts () {
  this.postsService
    .pendingPosts(this.pageOffset, this.pageIndex, this.orderBy)
    .pipe(takeUntil(this._subscribe))
    .subscribe((response) => {
      this.posts = response.data
      this.total = response.total
      this.pageIndex = response.current_page
      this.loading = false
    })
}

ngOnDestroy (): void {
  this._subscribe.next()
  this._subscribe.complete()
}
}
