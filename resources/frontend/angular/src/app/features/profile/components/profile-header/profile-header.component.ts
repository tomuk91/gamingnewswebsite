import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthenticationService } from 'src/app/core/services/authentication.service'
import { User } from 'src/app/features/user/user'

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
 public public!: boolean;
 public user!: Observable<User[]>;
 private sub!: Subscription;

 constructor (private auth: AuthenticationService) {}

 ngOnInit () {
   this.publicState()
   this.getUserId()
 }

 // private methods

 private getUserId () {
   this.user = this.auth.user
 }

 private publicState () {
   this.sub = this.auth.public.subscribe(
     (value) => {
       this.public = value
     }
   )
 }

 ngOnDestroy (): void {
   this.sub.unsubscribe()
 }
}
