import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTotal'
})
export class CalculateTotalPipe implements PipeTransform {
  transform(value: Record<string, { total: number }>): number {
    return Object.values(value).reduce((total, group) => total + group.total, 0);
  }
}
