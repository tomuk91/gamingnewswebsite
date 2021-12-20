import { PostDetails } from '../../features/profile/pages/user-posts/posts';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:8000';
  private endpoint = '/currentuserposts';
  protected _url = `${this.baseUrl}${this.endpoint}`;

  getUserPosts(
    pageOffset: number,
    page: number,
    orderBy: string
  ): Observable<any> {
    const params = new HttpParams({
      fromObject: { pageOffset, page, orderBy },
    });
    return this.http.get(`${this._url}`, { params: params ? params : {} });
  }
}
