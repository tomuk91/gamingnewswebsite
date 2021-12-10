import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { comments } from 'src/app/features/posts/comments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {


  public sendReply: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  getCommentsByPostId($post_id: string) {
    let params = new HttpParams().set('post_id', $post_id);

    return this.http.get<comments[]>('http://localhost:8000/getpostcomments', {
      params: params,
    });
  }


}
