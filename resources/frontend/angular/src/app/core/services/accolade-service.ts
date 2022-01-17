import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AccoladeService {
  baseUrl = 'http://localhost:8000';

  public stats: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(private http: HttpClient) {}

  getStats(guest: boolean, user_id: number) {
    const endpoint = '/stats';
    let params = new HttpParams();
    params = params.set('public', guest);
    params = params.set('userId', user_id);
    return this.http.get(`${this.baseUrl}${endpoint}`, {params: params}).pipe
    (map(response => response), shareReplay());
  }

  getAccolades() {
    const endpoint = '/accolades';
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }
}
