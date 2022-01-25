import { Router } from '@angular/router'
import { Inbox } from '../../features/profile/pages/messages/pages/messages/inbox.interface'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  HttpClient,
  HttpParams
} from '@angular/common/http'
import { messages } from 'src/app/features/profile/pages/messages/pages/messages/messages.interface'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor (private http: HttpClient, private router: Router) {}

private baseUrl = '//localhost:8000/api';

conversationMessages (id: number) {
  const endpoint = '/messages'
  let params = new HttpParams()
  params = params.set('conversation_id', id)

  return this.http.get<messages[]>(`${this.baseUrl}${endpoint}`, {
    params: params
  })
}

conversation (): Observable<Inbox[]> {
  const endpoint = '/conversation'
  return this.http.get<Inbox[]>(`${this.baseUrl}${endpoint}`)
}

reply (data: FormData) {
  const endpoint = '/reply'
  return this.http.post(`${this.baseUrl}${endpoint}`, data)
}

checkMessageAuth (id: number | string) {
  const endpoint = '/messagecheck'
  let params = new HttpParams()
  params = params.set('id', id)
  return this.http.get(`${this.baseUrl}${endpoint}`, { params: params })
}

deleteMessage (id: number) {
  const endpoint = '/deletemessage'
  let params = new HttpParams()
  params = params.set('id', id)
  return this.http.delete(`${this.baseUrl}${endpoint}`, {
    params: params
  })
}

createConversation (data: FormData) {
  const endpoint = '/createconversation'
  return this.http.post(`${this.baseUrl}${endpoint}`, data)
}
}
