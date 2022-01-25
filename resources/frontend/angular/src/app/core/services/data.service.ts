import { categories } from '../../features/posts/categories'
import { comments } from './../../features/posts/comments'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { NotificationService } from './notification.service'
import { Observable } from 'rxjs'
import { PostDetails } from 'src/app/features/posts/post-details'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '//localhost:8000/api';

  constructor (private http: HttpClient, private notify: NotificationService) {}

  public uploadProfileImage (data: any) {
    const endpoint = '/profileImage'
    return this.http
      .post(`${this.baseUrl}${endpoint}`, data)
      .pipe((data) => {
        this.notify.showSuccess('Success', 'Profile Image Updated!')
        return data
      })
  }

  public createPost (data: any) {
    const endpoint = '/createpost'
    return this.http.post(`${this.baseUrl}${endpoint}`, data)
  }

  public getCategories () {
    const endpoint = '/category'
    return this.http.get<categories[]>(`${this.baseUrl}${endpoint}`)
  }

  public getPostById (postId: string): Observable<PostDetails> {
    const endpoint = '/postbyid'
    const params = new HttpParams().set('post_id', postId)

    return this.http.get<PostDetails>(`${this.baseUrl}${endpoint}`, {
      params: params
    })
  }

  public getCommentsByPostId (postId: string): Observable<comments[]> {
    const endpoint = '/postcomments'
    const params = new HttpParams().set('post_id', postId)

    return this.http.get<comments[]>(`${this.baseUrl}${endpoint}`, {
      params: params
    })
  }
}
