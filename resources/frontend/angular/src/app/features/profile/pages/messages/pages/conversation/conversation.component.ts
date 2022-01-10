import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Inbox } from '../../inbox.interface';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public inbox!: any;
  public conversations!: any;
  private paramSub = new Subscription();
  id!: number;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(params['id']);
    });
    this.userInbox();
  }

  userInbox() {
    this.messageService.conversation(this.id).subscribe(
      (response) => {
        this.inbox = response;
      }
    );
  }


  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
