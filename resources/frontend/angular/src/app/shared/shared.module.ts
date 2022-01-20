import { RouterModule } from '@angular/router'
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExternalHrefPipe } from './pipes/external-links.pipe'
import { LogPipe } from './pipes/log.pipe'
import { SanitizedImagePipe } from './pipes/sanitized-image.pipe'
import { PostsContainerComponent } from './components/posts-container/posts-container.component'
import { PostsHeaderContainerComponent } from './components/posts-header-container/posts-header-container.component'

@NgModule({
  declarations: [
    ExternalHrefPipe,
    LogPipe,
    SanitizedImagePipe,
    PostsContainerComponent,
    PostsHeaderContainerComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    ExternalHrefPipe,
    LogPipe,
    SanitizedImagePipe,
    PostsContainerComponent,
    PostsHeaderContainerComponent
  ]
})
export class SharedModule { }
