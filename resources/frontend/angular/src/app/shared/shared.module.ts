import { RouterModule } from '@angular/router'
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExternalHrefPipe } from './pipes/external-links.pipe'
import { LogPipe } from './pipes/log.pipe'
import { SanitizedImagePipe } from './pipes/sanitized-image.pipe'
import { PostsContainerComponent } from './components/posts-container/posts-container.component'
import { PostsHeaderContainerComponent } from './components/posts-header-container/posts-header-container.component'
import { ErrorMessagesComponent } from './components/error-messages.component'
import { PrettyPrintPipe } from './pipes/prettyprint.pipe'
@NgModule({
  declarations: [
    ExternalHrefPipe,
    LogPipe,
    SanitizedImagePipe,
    PostsContainerComponent,
    PostsHeaderContainerComponent,
    ErrorMessagesComponent,
    PrettyPrintPipe
  ],
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    ExternalHrefPipe,
    PrettyPrintPipe,
    LogPipe,
    SanitizedImagePipe,
    PostsContainerComponent,
    PostsHeaderContainerComponent,
    ErrorMessagesComponent
  ]
})
export class SharedModule { }
