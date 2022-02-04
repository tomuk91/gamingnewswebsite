import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '../../../../../../core/services/notification.service'
import { Inbox } from '../messages/inbox.interface'
import { MessageService } from '../../../../../../core/services/message.service'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  public inbox: Inbox[] = [];
  private routeSub = new Subscription();

  constructor (
    private router: Router,
    private messageService: MessageService,
    private notify: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit (): void {
    this.getRouteData()
  }

  // public methods

  public deleteMessage (id: number) {
    return this.messageService.deleteMessage(id).subscribe(
      ($result) => {
        this.notify.showSuccess('Successfully Deleted', 'Success')
        this.reloadCurrentRoute()
        return $result
      },
      ($error) => {
        this.notify.showError('Unable to delete, try again later', 'Failed')
        return $error
      }
    )
  }

  // private methods

  private getRouteData () {
    this.routeSub = this.route.data.subscribe((inbox) => {
      if (!inbox.inbox) return
      this.inbox = inbox.inbox
    })
  }

  private reloadCurrentRoute () {
    const currentUrl = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl])
    })
  }

  ngOnDestroy (): void {
    this.routeSub.unsubscribe()
  }
}
