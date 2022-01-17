import { AccoladeService } from 'src/app/core/services/accolade-service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accolade-progress',
  templateUrl: './accolade-progress.component.html',
  styleUrls: ['./accolade-progress.component.scss'],
})
export class AccoladeProgressComponent implements OnInit {
  @Input() public: any;
  @Input() user_id!: any;
  public stats!: any;
  public accolades: any;


  constructor(private accoladeService: AccoladeService) {}

  ngOnInit(): void {
    this.getAllAccolades();

    this.accoladeService.getStats(this.public, this.user_id).subscribe(
      (response) => {
        this.stats = response;
        console.log(response);
      })
  }

  getAllAccolades() {
    this.accoladeService.getAccolades().subscribe(response => {
      this.accolades = response;
      console.log(this.accolades);
    })
  }

  
}
