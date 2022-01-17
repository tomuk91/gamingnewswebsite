import { AccoladeService } from 'src/app/core/services/accolade-service';
import { DataService } from 'src/app/core/services/data.service';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss'],
})

export class QuickStatsComponent {
  @Input() public!: boolean;
  @Input() user_id!: number;
  public stats!: Observable<any>;

  constructor(private accoladeService: AccoladeService) {}

  ngOnChanges(): void {
    this.getStats();
  }

  getStats() {
    this.stats = this.accoladeService.getStats(this.public, this.user_id);
  }
}
