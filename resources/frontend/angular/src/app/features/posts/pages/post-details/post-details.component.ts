import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { PostDetails } from 'src/app/features/posts/post-details';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  public postId: string = '';
  public post!: PostDetails;
  public error: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private DataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.postId = paramsId.id;
    });

    this.getPost();
  }

  protected getPost() {
    this.DataService.getPostById(this.postId).subscribe(
      (post) => {
        this.post = post;
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/404']);
        }
        return error;
      }
    );
  }

  vote() {
    const data = {
      post_id: this.postId,
    };

    this.DataService.vote(data).subscribe(
      (vote: any) => {
        alert(vote.message);
        return vote;
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  calculateDiff(sentDate: string | number | Date) {
    let date1 = moment(sentDate);
    let date2 = moment(new Date());
    return date1.from(date2);
  }
}
