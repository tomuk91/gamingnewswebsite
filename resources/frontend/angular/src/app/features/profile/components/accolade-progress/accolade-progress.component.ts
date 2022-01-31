import { accolades } from './../../accolades.interface'
import { stats } from './../../stats.interface'
import { AccoladeService } from 'src/app/core/services/accolade-service'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-accolade-progress',
  templateUrl: './accolade-progress.component.html',
  styleUrls: ['./accolade-progress.component.scss']
})
export class AccoladeProgressComponent implements OnInit {
@Input() public!: boolean; // gets id fom profile-details component
@Input() userId!: number; // gets id fom profile-details component
public stats!: stats;
public accolades!: accolades[];

constructor (private accoladeService: AccoladeService) {}

ngOnInit (): void {
  this.getAllAccolades()
  this.getStats()
}

// private methods

/**
 * retrieves user stats data from backend
 */

private getStats () {
  this.accoladeService
    .getStats(this.public, this.userId)
    .subscribe((response) => {
      this.stats = response
    })
}

/**
 * retrieves user accolades from backend
 */

private getAllAccolades () {
  this.accoladeService.getAccolades().subscribe((response) => {
    this.accolades = response
  })
}
}
