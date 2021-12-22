import { PostDetails } from 'src/app/features/posts/post-details';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

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

  postsByCategory($id: any) {
    const endpoint = '/postbycat';
    const fullUrl = `${this.baseUrl}${endpoint}`;
    let params = new HttpParams();
    params = params.set('id', $id);

    return this.http.get<PostDetails[]>(`${fullUrl}`, { params: params });
  }

  pendingPosts(pageOffset: number, page: number, orderBy: string): Observable<any> {
    const pendingEndPoint = '/pending';
    const pendingUrl = `${this.baseUrl}${pendingEndPoint}`;
    const params = new HttpParams({
      fromObject: { pageOffset, page, orderBy },
    });
    return this.http.get(`${pendingUrl}`, { params: params ? params : {} });
  }
  
  vote(data: any) {
    return this.http.post('http://localhost:8000/vote', data);
  }

  calculateDiff(sentDate: string | number | Date) {
    let date1 = moment(sentDate);
    let date2 = moment(new Date());
    return date1.from(date2);
  }


}
