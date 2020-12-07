import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cleanDateTime' })
export class CleanDateTimePipe implements PipeTransform {

  transform(dateString: string, ...args: unknown[]) {
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') return 'N/A';

    const pad = (x: number) => x.toString().padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const month = date.toLocaleString('default', { month: 'long' });

    return `${month} ${date.getDate()} ${date.getFullYear()}, ${hours}:${minutes}`;
  }
}
