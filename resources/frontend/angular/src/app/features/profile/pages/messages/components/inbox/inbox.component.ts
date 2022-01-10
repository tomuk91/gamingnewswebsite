import { Inbox } from './../../inbox.interface';
import { MessageService } from './../../../../../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  public inbox!: Observable<Inbox[]>;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.userInbox();
  }

  userInbox() {
    this.inbox = this.messageService.userInbox()
  }

}
