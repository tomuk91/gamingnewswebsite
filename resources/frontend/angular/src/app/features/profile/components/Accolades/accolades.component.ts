import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accolades',
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss']
})
export class AccoladesComponent implements OnInit {
@Input() accolades!: any

  constructor() {}

  ngOnInit(): void {
  }
}
