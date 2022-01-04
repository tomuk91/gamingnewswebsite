import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  exports: [PaginationComponent],
})
export class PaginationModule {
}
