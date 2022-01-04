import { categories } from './../../features/posts/pages/create-post/categories';
import { comments } from './../../features/posts/comments';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Posts } from '../../features/profile/pages/user-posts/posts';
import { Observable } from 'rxjs';
import { PostDetails } from 'src/app/features/posts/post-details';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  createPost(data: any) {
    console.log('in service');
    return this.http.post('http://localhost:8000/createpost', data);
  }


  getCategories() {
    return this.http.get<categories[]>('http://localhost:8000/category');
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
