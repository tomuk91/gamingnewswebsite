import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-posts-header-container',
  templateUrl: './posts-header-container.component.html',
  styleUrls: ['./posts-header-container.component.scss']
})
export class PostsHeaderContainerComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;

  public hideDesc: boolean = false;

  constructor () { }

  ngOnInit (): void {
  }

  // public methods

  public hidden () {
    this.hideDesc = !this.hideDesc
  }
}
