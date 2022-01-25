import { PostDetails } from 'src/app/features/posts/post-details'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor (private http: HttpClient) {}

  private readonly baseUrl = '//localhost:8000/api';
  private endpoint = '/currentuserposts';
  protected _url = `${this.baseUrl}${this.endpoint}`;

  getUserPosts (
    pageOffset: number,
    page: number,
    orderBy: string
  ): Observable<any> {
    const params = new HttpParams({
      fromObject: { pageOffset, page, orderBy }
    })
    return this.http.get(`${this._url}`, { params: params || {} })
  }

  postsByCategory ($id: any) {
    const endpoint = '/postbycat'
    const fullUrl = `${this.baseUrl}${endpoint}`
    let params = new HttpParams()
    params = params.set('id', $id)

    return this.http.get<PostDetails[]>(`${fullUrl}`, { params: params })
  }

  featuredPosts () {
    const featuredEndpoint = '/featuredposts'
    const fullFeaturedUrl = `${this.baseUrl}${featuredEndpoint}`
    return this.http.get<PostDetails[]>(fullFeaturedUrl)
  }

  pendingPosts (pageOffset: number, page: number, orderBy: string): Observable<any> {
    const pendingEndPoint = '/pending'
    const pendingUrl = `${this.baseUrl}${pendingEndPoint}`
    const params = new HttpParams({
      fromObject: { pageOffset, page, orderBy }
    })
    return this.http.get(`${pendingUrl}`, { params: params || {} })
  }

  latestApprovedPosts (page: number, pageOffset: number, orderBy: string) {
    const latestEndPoint = '/latestapprovedposts'
    const latestPostsUrl = `${this.baseUrl}${latestEndPoint}`
    const params = new HttpParams({
      fromObject: { pageOffset, page, orderBy }
    })
    return this.http.get(`${latestPostsUrl}`, { params: params || {} })
  }

  vote (data: any) {
    const endpoint = '/vote'
    return this.http.post(`${this.baseUrl}${endpoint}`, data)
  }

  calculateDiff (sentDate: string | number | Date) {
    const date1 = moment(sentDate)
    const date2 = moment(new Date())
    return date1.from(date2)
  }
}
