import { Pipe, PipeTransform } from '@angular/core';
import { kebabToTitleCase } from '../utils';

@Pipe({
  name: 'kebabToTitleCase'
})
export class KebabToTitleCasePipe implements PipeTransform {
  transform(words: string) {
    return kebabToTitleCase(words);
  }
}
