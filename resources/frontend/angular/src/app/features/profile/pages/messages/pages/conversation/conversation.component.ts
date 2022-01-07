import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  public inbox!: Observable<any>;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.userInbox();
  }

  userInbox() {
    this.inbox = this.messageService.userInbox()
  }

}
