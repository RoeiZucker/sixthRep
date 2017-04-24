import { Pipe, PipeTransform } from '@angular/core';
import {SimCard} from '../Entities'

@Pipe({
  name: 'SimFilter'
})
export class SimFilterPipe implements PipeTransform {

  transform(value: SimCard[], valueContained: string): SimCard[] {
    return value.filter(val => val.SimNumber.includes(valueContained));
  }

}