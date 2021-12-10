import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  clicked: boolean = false;

  constructor() {}

  ngOnInit() {}

  Clicked() {
    this.clicked = true;
  }
}
