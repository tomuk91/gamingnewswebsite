import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'sanitizedImage'
})
export class SanitizedImagePipe implements PipeTransform {
  constructor (private sanitized: DomSanitizer) {}
  transform (value: any): any {
    return this.sanitized.bypassSecurityTrustUrl(value)
  }
}
