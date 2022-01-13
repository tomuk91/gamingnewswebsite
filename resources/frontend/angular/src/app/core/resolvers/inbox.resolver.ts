import { MessageService } from '../services/message.service';
import { Injectable } from '@angular/core';
import {
 Resolve, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Inbox } from 'src/app/features/profile/pages/messages/inbox.interface';

@Injectable({
  providedIn: 'root'
})
export class InboxResolver implements Resolve<Inbox[]> {
  constructor(private msgService: MessageService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Inbox[]> | Inbox[] {
    return this.msgService.conversation();
  }
}
