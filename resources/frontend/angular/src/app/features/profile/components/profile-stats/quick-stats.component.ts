import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss']
})
export class QuickStatsComponent implements OnInit {
  public stats!: Observable<any>

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.stats = this.dataService.getStats();
   }

}
