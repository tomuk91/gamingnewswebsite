import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { comments } from 'src/app/features/posts/comments'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Data } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public sendReply: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  baseUrl = '//localhost:8000/api'

  constructor (private http: HttpClient) {}

  public getCommentsByPostId (postId: string) {
    const endpoint = '/postcomments'
    const params = new HttpParams().set('post_id', postId)

    return this.http.get<comments[]>(`${this.baseUrl}${endpoint}`, {
      params: params
    })
  }

  public replyToComment (data: Data) {
    const endpoint = '/createcomment'
    return this.http.post(`${this.baseUrl}${endpoint}`, data)
  }

  public createComment (data: Data) {
    const endpoint = '/createcomment'
    return this.http.post(`${this.baseUrl}${endpoint}`, data)
  }
}
