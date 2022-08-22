import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "timeRemaining",
})
export class TimeRemainingPipe implements PipeTransform {
  transform(value: number) {
    if (value <= 60) {
      return `${value} seconds`;
    }

    const minutesRemaining = Math.ceil(value / 60);
    return `${minutesRemaining} minutes`;
  }
}