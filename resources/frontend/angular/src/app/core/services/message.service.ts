import { PostDetails } from 'src/app/features/posts/post-details';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:8000';

  userInbox() {
    const endpoint = '/userinbox';
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }

}
