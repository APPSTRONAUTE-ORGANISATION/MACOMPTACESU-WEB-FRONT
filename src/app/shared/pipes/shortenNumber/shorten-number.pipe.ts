import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenNumber',
  standalone: true,
})
export class ShortenNumberPipe implements PipeTransform {
  transform(value: any, decimalPlaces: number = 1): string {
    // Return '0' if the value is undefined, null, or an empty string
    if (value == null || value === '' || isNaN(Number(value))) {
      return '0';
    }

    // Convert the value to a number
    const numericValue = typeof value === 'number' ? value : Number(value);

    // Return '0' if the numeric value is invalid or zero
    if (!isFinite(numericValue) || numericValue === 0) {
      return '0';
    }

    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const absValue = Math.abs(numericValue); // Handle negative numbers
    let tier = Math.floor(Math.log10(absValue) / 3);

    // Ensure tier is within the bounds of the suffixes array
    tier = Math.max(0, Math.min(tier, suffixes.length - 1));

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaledValue = numericValue / scale;

    return scaledValue.toFixed(decimalPlaces) + suffix;
  }
}
