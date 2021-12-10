import { comments } from './../../features/posts/comments';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../../shared/directives/notification.service';
import { Posts } from '../../features/profile/pages/user-posts/posts';
import { Observable } from 'rxjs';
import { PostDetails } from 'src/app/features/posts/post-details';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private notify: NotificationService) {}

  uploadProfileImage(data: any) {
    return this.http
      .post('http://localhost:8000/profileImage', data)
      .pipe((data) => {
        this.notify.showSuccess('Success', 'Profile Image Updated!');
        return data;
      });
  }

  getUserPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>('//localhost:8000/currentuserposts');
  }

  getPostById($post_id: string): Observable<PostDetails> {
    let params = new HttpParams().set('post_id', $post_id);

    return this.http.get<PostDetails>('//localhost:8000/postbyid', {
      params: params,
    });
  }

  getCommentsByPostId($post_id: string): Observable<comments[]> {
    let params = new HttpParams().set('post_id', $post_id);

    return this.http.get<comments[]>('//localhost:8000/getpostcomments', {
      params: params,
    });
  }
}
``;
