import { State } from './pagination-state'
import { BehaviorSubject } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('length') length!: number;
  @Input('pageOffset') pageOffset!: number;
  @Input('pageIndex') pageIndex!: number;

  paginate = new BehaviorSubject<State>({
    page: 1,
    pageOffset: this.pageOffset
  });

  constructor () {}

  ngOnInit (
  ): void {
    const state = this.paginate.value
    state.pageOffset = this.pageOffset
  }

  ngAfterViewInit (): void {
    const newState = this.paginate.value
    newState.page = this.pageIndex = 1
    this.paginate.next(newState)
  }

  getFirstPage () {
    const newState = this.paginate.value
    newState.page = this.pageIndex = 1
    this.paginate.next(newState)
  }

  getNextPage () {
    const newState = this.paginate.value
    newState.page = this.pageIndex = this.pageIndex + 1
    this.paginate.next(newState)
  }

  getPreviousPage () {
    const newState = this.paginate.value
    newState.page = this.pageIndex = this.pageIndex - 1
    this.paginate.next(newState)
  }

  getLastPage () {
    const newState = this.paginate.value
    this.pageIndex = (this.length % this.pageOffset === 0) ? (this.length / this.pageOffset) : ((this.length / this.pageOffset) + 1)
    this.pageIndex = Math.floor(this.pageIndex)
    newState.page = this.pageIndex
    this.paginate.next(newState)
  }
}
