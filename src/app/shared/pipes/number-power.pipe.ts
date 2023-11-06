import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPower'
})
export class NumberPowerPipe implements PipeTransform {

  transform(value = 0, power = 1): unknown {
    return Math.pow(value, power);
  }

}
