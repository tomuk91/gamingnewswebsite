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
  @Input() public!: boolean;
  @Input() userId!: number;
  public stats!: stats;
  public accolades!: accolades[];

  constructor (private accoladeService: AccoladeService) {}

  ngOnInit (): void {
    this.getAllAccolades()
    this.getStats()
  }

  // private methods

  private getStats () {
    this.accoladeService
      .getStats(this.public, this.userId)
      .subscribe((response) => {
        this.stats = response
      })
  }

  private getAllAccolades () {
    this.accoladeService.getAccolades().subscribe(response => {
      this.accolades = response
    })
  }
}
