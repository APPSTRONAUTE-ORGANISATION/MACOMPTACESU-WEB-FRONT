import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
  standalone: true, // Makes the pipe standalone, usable without declaring in a module
})
export class ReplacePipe implements PipeTransform {
  transform(value: string | null | undefined, search: string, replacement: string): string {
    if (value == null) {
      // Handles null or undefined values
      return '';
    }
    return value.split(search).join(replacement);
  }
}
