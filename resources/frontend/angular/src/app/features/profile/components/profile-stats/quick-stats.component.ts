import { stats } from './../../stats.interface'
import { AccoladeService } from 'src/app/core/services/accolade-service'
import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss']
})
export class QuickStatsComponent {
@Input() public!: boolean; // inputted from profile-details component
@Input() userId!: number; // inputted from profile-details component
public stats!: Observable<stats>;

constructor (private accoladeService: AccoladeService) {}

ngOnChanges (): void {
  this.getStats()
}

// private methods

/**
* Get user stats data for user profile
*/

private getStats () {
  this.stats = this.accoladeService.getStats(this.public, this.userId)
}
}
